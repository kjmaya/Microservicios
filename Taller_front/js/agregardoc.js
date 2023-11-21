async function saveTeacherData(teacherData) {
  try {
    const response = await $.ajax({
      url: "http://localhost:8080/docentes",
      method: "post",
      data: teacherData,
    });
    console.log("Docente guardado exitosamente:", response);
  } catch (error) {
    console.error("Error al guardar el docente:", error);
  }
}

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

  $("form").submit(function (event) {
    event.preventDefault();
    const teacherData = {
      id: $("#teacherId").val(),
      nombre: $("#teacherName").val(),
      idOcupacion: $("#idOccupation").val(),
    };
    saveTeacherData(teacherData);
  });
});
