package com.galvanize.autos;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AutosController.class)
public class AutosControllerTests {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    AutosService autosService;

    ObjectMapper mapper = new ObjectMapper();

// GET: /api/autos
    // GET: /api/autos Returns List of all autos
    @Test
    void getAuto_noParms_exists_returnsAutosLists() throws Exception {
        // Arrange
        List<Automobile> automobiles = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            automobiles.add(new Automobile(1967+i, "Ford", "Mustang", "AABB"+i));
        }
        when(autosService.getAutos()).thenReturn(new AutosList(automobiles));
        // Act
        mockMvc.perform(get("/api/autos"))
                .andDo(print())
                // Assert
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.automobiles", hasSize(5)));
    }
    // GET: /api/autos Returns 204 no autos found
    @Test
    void getAutos_noParms_none_returnsNoContent() throws Exception {
        // Arrange
        when(autosService.getAutos()).thenReturn(new AutosList());
        // Act
        mockMvc.perform(get("/api/autos"))
                .andDo(print())
        // Assert
                .andExpect(status().isNoContent());
    }

    // GET: /api/autos?color=RED Returns Red Cars
    // GET: /api/autos?make=Ford returns Fords
    // GET: /api/autos?make=Ford&color=GREEN returns green fords
    @Test
    void getAutos_searchParms_exists_returnsAutosList() throws Exception {
        List<Automobile> automobiles = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            automobiles.add(new Automobile(1967+i, "Ford", "Mustang", "AABB"+i));
        }
        when(autosService.getAutos(anyString(), anyString())).thenReturn(new AutosList(automobiles));
        mockMvc.perform(get("/api/autos?color=RED&make=Ford"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.automobiles", hasSize(5)));
    }


// POST: /api/autos
    // POST: /api/autos returns created automobile
    @Test
    void addAuto_valid_returnsAuto() throws Exception {
        Automobile automobile = new Automobile(1967, "Ford", "Mustang", "AABBCC");
        when(autosService.addAuto(any(Automobile.class))).thenReturn(automobile);
        //String json = "{\"year\":1967,\"make\":\"Ford\",\"model\":\"Mustang\",\"color\":null,\"owner\":null,\"vin\":\"AABBCC\"}";
        mockMvc.perform(post("/api/autos").contentType(MediaType.APPLICATION_JSON)
                                        .content(mapper.writeValueAsString(automobile)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("make").value("Ford"));
    }

    // POST: /api/autos Returns error message due to bad request (400)

    @Test
    void addAuto_badRequest_returns400() throws Exception {
        when(autosService.addAuto(any(Automobile.class))).thenThrow(InvalidAutoException.class);
        String json = "{\"year\":1967,\"make\":\"Ford\",\"model\":\"Mustang\",\"color\":null,\"owner\":null,\"vin\":\"AABBCC\"}";
        mockMvc.perform(post("/api/autos").contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }


// GET: /api/autos/{vin}
    // GET: /api/autos/{vin} Returns the requested automobile
    @Test
    void getAuto_withVin_returnsAuto() throws Exception {
        Automobile automobile = new Automobile(1967, "Ford", "Mustang", "AABBCC");
        when(autosService.getAuto(anyString())).thenReturn(automobile);
        mockMvc.perform(get("/api/autos/"+automobile.getVin()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("vin").value(automobile.getVin()));
    }

    // GET: /api/autos/{vin} Returns NoContent(204) Auto not found

// PATCH: /api/autos{vin}
    // PATCH: /api/autos{vin} Returns patched automobile
    @Test
    void updateAuto_withObject_returnsAuto() throws Exception {
        Automobile automobile = new Automobile(1967, "Ford", "Mustang", "AABBCC");
        when(autosService.updateAuto(anyString(), anyString(), anyString())).thenReturn(automobile);
        mockMvc.perform(patch("/api/autos/"+automobile.getVin())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"color\":\"RED\",\"owner\":\"Bob\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("color").value("RED"))
                .andExpect(jsonPath("owner").value("Bob"));
    }

    // PATCH: /api/autos{vin} Returns NoContent auto not found
    // PATCH: /api/autos{vin} returns 400 bad request (no payload, no changes, or already done?)

// DELETE: /api/autos/{vin}
    // DELETE: /api/autos/{vin} Returns 202, delete request accepted
    @Test
    void deleteAuto_withVin_exists_returns202() throws Exception {

        mockMvc.perform(delete("/api/autos/AABBCC"))
                .andExpect(status().isAccepted());
        verify(autosService).deleteAuto(anyString());
    }

    // DELETE: /api/autos/{vin} Returns 204, vehicle not found

    @Test
    void deleteAuto_withVin_notExists_returnsNoContent() throws Exception {
        doThrow(new AutoNotFoundException()).when(autosService).deleteAuto(anyString());
        mockMvc.perform(delete("/api/autos/AABBCC"))
                .andExpect(status().isNoContent());
    }
}
