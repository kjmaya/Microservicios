$(document).ready(() => {
    let teachersList = [];
    retrieveTeachers();

    async function retrieveTeachers() {
        try {
            const response = await $.ajax({
                url: "http://localhost:8080/docentes",
                method: "GET",
            });
            teachersList = response.allowed;
            displayTeachers(teachersList);
        } catch (error) {
            console.error("Error retrieving teachers:", error);
        }
    }

    async function obtainOccupationName(idOcupacion) {
        try {
            const response = await $.ajax({
                url: `http://localhost:8080/ocupaciones/${idOcupacion}`,
                method: "GET",
                dataType: "json",
            });
            return response.nombre;
        } catch (error) {
            console.error("Error obtaining occupation name:", error);
            return "Unknown";
        }
    }

    async function displayTeachers(teachers) {
        const tableBody = $('#tdocentes').find('tbody');
        let html = "";

        for (const docente of teachers) {
            const occupationName = await obtainOccupationName(docente.idOcupacion);
            html += `<tr>
                        <td>${docente.id}</td>
                        <td>${docente.nombre}</td>
                        <td>${occupationName}</td>
                        <td><a class="" href="view/ModificarDoc.html?id=${docente.id}">modify</a></td>
                        <td><a class="delete" data-id="${docente.id}">delete</a></td>
                    </tr>`;
        }
        tableBody.html(html);
    }

    async function deleteTeacher(id) {
        try {
            const response = await $.ajax({
                url: `http://localhost:8080/docentes/${id}`,
                method: "DELETE",
            });
            console.log("Teacher deleted successfully:", response);
            retrieveTeachers();
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    }

    $(document).on("click", ".delete", function () {
        let id = $(this).data("id");
        deleteTeacher(id);
    });
});
