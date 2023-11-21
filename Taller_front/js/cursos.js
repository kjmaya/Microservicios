$(document).ready(() => {
    let CursesList = [];
    retrieveCursess();

    async function retrieveCursess() {
        try {
            const response = await $.ajax({
                url: "http://localhost:8080/curso",
                method: "GET",
            });
            CursesList = response.allowed;
            displayCursos(CursesList);
        } catch (error) {
            console.error("Error retrieving teachers:", error);
        }
    }

    async function obtainteacherName(codDocente) {
        try {
            const response = await $.ajax({
                url: `http://localhost:8080/docentes/${codDocente}`,
                method: "GET",
                dataType: "json",
            });
            return response.nombre;
        } catch (error) {
            console.error("Error obtaining docentes name:", error);
            return "Unknown";
        }
    }

    async function displayCursos(cursos) {
        const tableBody = $('#tcursos').find('tbody');
        let html = "";

        for (const curso of cursos) {
            const teachername = await obtainteacherName(curso.codDocente);
            html += `<tr>
                        <td>${curso.id}</td>
                        <td>${curso.nombre}</td>
                        <td>${teachername}</td>
                        <td><a class="" href="ModificarCur.html?id=${curso.id}">modify</a></td>
                        <td><a class="delete" data-id="${curso.id}">delete</a></td>
                    </tr>`;
        }
        tableBody.html(html);
    }

    async function deleteCursos(id) {
        try {
            const response = await $.ajax({
                url: `http://localhost:8080/curso/${id}`,
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
