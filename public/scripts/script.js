$(document).ready(function () {

    getData();

});

//Récupération et affichage des articles globales de l'API
function getData() {

    // Requête AJAX $.ajax() de type "GET" permettant d'aller chercher les données de l'API
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Boucle permettant de parcourir tout le tableau data
            for (let i = 0; i < data.length; i++) {
                $data = data[i];
                // On insère des lignes <tr> dans la balise <tbody>
                $('tbody').append(`
                <!-- Ajout d'un id="row" permettant d'identifier la ligne à supprimer -->
                <tr id="row${$data.id}">
                    <td class="text-center">${$data.userId}</td>
                    <td class="text-center">${$data.id}</td>
                    <td>${$data.title}</td>
                    <td>${$data.body}</td>
                    <td>
                        <!-- Bouton de suppression de la ligne -->
                        <button type="button" class="btn btn-danger" onclick="removeData($('#row${$data.id}'))"><i class="fas fa-trash-alt"></i></button>
                        <!-- Bouton d'affichage de la modal permettant d'afficher les détails de l'article -->
                        <button type="button" onclick="getDetailData(${$data.id})" class="btn btn-secondary" data-toggle="modal" data-target="#modalShow"><i class="fas fa-search"></i></button>
                    </td>
                <tr>
                `);
            };
        }
    });

}

//Récupération et affichage des détails d'un article
function getDetailData(params) {

    // Requête AJAX $.get() permettant d'aller chercher les détails d'un article de l'API
    $.get('https://jsonplaceholder.typicode.com/posts/' + params,
        function (data) {
            // On insère un paragraphe <p> dans la balise ayant pour id="modalBody"
            $('#modalBody').html(`
                    <p>
                        <b>User Id :</b> ${data.userId}</br>
                        <b>Id :</b> ${data.id}</br>
                        <b>Title :</b> ${data.title}</br>
                        <b>Body :</b> ${data.body}</br>
                    </p>
                    `);
        },'json');

}

//Ajout d'un nouvelle article dans une nouvelle ligne
function postNewData() {

    // $userId contient la valeur de l'input ayant id="userId"
    $userId = $('#userId').val();
    $title = $('#title').val();
    $body = $('#body').val();

    // Requête AJAX $.post() permettant d'ajouter un article à l'API
    $.post('https://jsonplaceholder.typicode.com/posts/',
        {
            userId: $userId,
            title: $title,
            body: $body,
        }, function (data) {
            $('tbody').append(`
                <!-- Ajout d'un id="row" permettant d'identifier la ligne à supprimer -->
                <tr id="row${data.id}">
                    <td class="text-center">${data.userId}</td>
                    <td class="text-center">${data.id}</td>
                    <td>${data.title}</td>
                    <td>${data.body}</td>
                    <td>
                      <button type="button" onclick="removeData($('#row${data.id}'))" class="btn btn-danger" id="remove"><i class="fas fa-trash-alt"></i></button>     
                      <button type="button" onclick="getDetailData(${data.id})" class="btn btn-secondary" data-toggle="modal" data-target="#modalShow" id="show"><i class="fas fa-search"></i></button>
                    </td>
                <tr>
            `);
        },
    'json');

    // On vide le formulaire afin qu'il soit prêt à être remplit un nouvelle fois
    $('#myForm')[0].reset();

}

//Supppression d'une ligne
function removeData(params) {
    return params.remove();
}