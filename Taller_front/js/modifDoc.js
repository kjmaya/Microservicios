$(document).ready(async () => {
    let occupations = [];
    let occupationIds = [];
  
    try {
      const response = await $.ajax({
        url: "http://localhost:8080/ocupaciones",
        method: "get",
      });
      saveOccupationIds(response);
      await viewTeachers(occupationIds);
    } catch (error) {
      console.error("Error al obtener las ocupaciones:", error);
    }
  
    function saveOccupationIds(occupationsData) {
      occupations = occupationsData.allowed;
      occupationIds = occupations.map((item) => item.id);
    }
  
    async function getOccupationName(occupationId) {
      try {
        const response = await $.ajax({
          url: `http://localhost:8080/ocupaciones/${occupationId}`,
          method: "get",
          dataType: "json",
        });
        return response.nombre;
      } catch (error) {
        throw error;
      }
    }
  
    async function viewTeachers(ids) {
      let html = "<option></option>";
      const names = await Promise.all(
        ids.map(async (id) => {
          const name = await getOccupationName(id);
          return { id, name };
        })
      );
      names.forEach(({ id, name }) => {
        html += `<option value="${id}">${name}</option>`;
      });
      document.getElementById("idOccupation").innerHTML = html;
    }
  
    $("#teacherId").on("input", async function () {
      const teacherIdToLoad = $(this).val();
  
      try {
        const loadedTeacher = await $.ajax({
          url: `http://localhost:8080/docentes/${teacherIdToLoad}`,
          method: "get",
        });
  
        $("#teacherName").val(loadedTeacher.nombre);
        $("#idOccupation").val(loadedTeacher.idOcupacion);
  
      } catch (error) {
        console.error("Error al cargar el docente:", error);
  
        if (error.responseJSON && error.responseJSON.error === "Docente no encontrado") {
          console.log("Respuesta del servidor:", error.responseJSON);
          $("#teacherName").val("");
          $("#idOccupation").val("");
  
          alert("El código del docente no está registrado en la base de datos.");
        }
      }
    });
  
    $("form").submit(function (event) {
      event.preventDefault();
      const teacherData = {
        id: $("#teacherId").val(),
        nombre: $("#teacherName").val(),
        idOcupacion: $("#idOccupation").val(),
      };
      saveTeacherData(teacherData);
    });
  
    async function saveTeacherData(teacherData) {
      try {
        const response = await $.ajax({
          url: `http://localhost:8080/docentes/${teacherData.id}`,
          method: "put",
          data: teacherData,
        });
        console.log("Docente actualizado exitosamente:", response);
      } catch (error) {
        console.error("Error al guardar el docente:", error);
      }
    }
  });
  
  
  