$(document).ready(async () => {
    let teachers = [];
    let teacherIds = [];
  
    try {
      const response = await $.ajax({
        url: "http://localhost:8080/docentes",
        method: "get",
      });
      saveTeacherIds(response);
      await viewCourses(teacherIds);
    } catch (error) {
      console.error("Error al obtener :", error);
    }
  
    function saveTeacherIds(teacherData) {
        teachers = teacherData.allowed;
        teacherIds = teachers.map((item) => item.id);
    }
  
    async function getTeacherName(teacherId) {
      try {
        const response = await $.ajax({
          url: `http://localhost:8080/docentes/${teacherId}`,
          method: "get",
          dataType: "json",
        });
        return response.nombre;
      } catch (error) {
        throw error;
      }
    }
  
    async function viewCourses(ids) {
      let html = "<option></option>";
      const names = await Promise.all(
        ids.map(async (id) => {
          const name = await getTeacherName(id);
          return { id, name };
        })
      );
      names.forEach(({ id, name }) => {
        html += `<option value="${id}">${name}</option>`;
      });
      document.getElementById("idTeacher").innerHTML = html;
    }
  
    $("#coursesId").on("input", async function () {
      const coursesIdToLoad = $(this).val();
  
      try {
        const loadedTeacher = await $.ajax({
          url: `http://localhost:8080/docentes/${coursesIdToLoad}`,
          method: "get",
        });
  
        $("#coursesName").val(loadedTeacher.nombre);
        $("#idDocente").val(loadedTeacher.idOcupacion);
  
      } catch (error) {
        console.error("Error al cargar :", error);
  
        if (error.responseJSON && error.responseJSON.error === "Docente no encontrado") {
          console.log("Respuesta del servidor:", error.responseJSON);
          $("#coursesName").val("");
          $("#idDocente").val("");
  
          alert("El código  no está registrado en la base de datos.");
        }
      }
    });
  
    $("form").submit(function (event) {
      event.preventDefault();
      const coursesData = {
        id: $("#coursesId").val(),
        nombre: $("#coursesName").val(),
        codDocente: $("#idTeacher").val(),
      };
      saveCoursesData(coursesData);
    });
  
    async function saveCoursesData(coursesData) {
      try {
        const response = await $.ajax({
          url: `http://localhost:8080/docentes/${coursesData.id}`,
          method: "put",
          data: coursesData,
        });
        console.log(" actualizado exitosamente:", response);
      } catch (error) {
        console.error("Error al guardar :", error);
      }
    }
  });
  
  
  