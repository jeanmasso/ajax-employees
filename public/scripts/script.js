$(document).ready(function () {

    getData();

    function getData() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    $data = data[i];
                    $('tbody').append(`
                <tr>
                    <td>${$data.userId}</td>
                    <td>${$data.id}</td>
                    <td>${$data.title}</td>
                    <td>${$data.body}</td>
                    <td>
                    <button type="button" class="btn btn-danger" id='remove'>Supprimer</button>
                    <button type="button" onclick="`getDetailData($data.id)``" class="btn btn-secondary" data-toggle="modal" data-target="#modalShow" id="show">Afficher</button>
                    <td>
                <tr>
                `);
                };

            }
        });

    }
    
    function getDetailData(params) {
        console.log(params);
        $.get('https://jsonplaceholder.typicode.com/posts/'+params,
                function (data) {
                    $('#modalBody').append(`
                    <p>
                        <b>User Id :</b> ${data[params].userId}</br>
                        <b>Id :</b> ${data[params].id}</br>
                        <b>Title :</b> ${data[params].title}</br>
                        <b>Body :</b> ${data[params].body}</br>
                    </p>
                    `);
                },'json');
    }

    // $('#show')

})