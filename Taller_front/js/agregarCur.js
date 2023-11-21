async function savecourseData(courseData) {
    try {
      const response = await $.ajax({
        url: "http://localhost:8080/curso",
        method: "post",
        data: courseData,
      });
      console.log("Curso guardado exitosamente:", response);
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  }
  
  $(document).ready(async () => {
    let teachers = [];
    let teachersIds = [];
  
    try {
      const response = await $.ajax({
        url: "http://localhost:8080/docentes",
        method: "get",
      });
      saveTeachersIds(response);
      await viewCourses(teachersIds);
    } catch (error) {
      console.error("Error:", error);
    }
  
    function saveTeachersIds(teachersData) {
      teachers = teachersData.allowed;
      teachersIds = teachers.map((item) => item.id);
    }
  
    async function getTecahersName(teacherId) {
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
          const name = await getTecahersName(id);
          return { id, name };
        })
      );
      names.forEach(({ id, name }) => {
        html += `<option value="${id}">${name}</option>`;
      });
      document.getElementById("idTeacher").innerHTML = html;
    }
  
    $("form").submit(function (event) {
      event.preventDefault();
      const courseData = {
        id: $("#coursesId").val(),
        nombre: $("#coursesName").val(),
        codDocente: $("#idTeacher").val(),
      };
      savecourseData(courseData);
    });
  });
  