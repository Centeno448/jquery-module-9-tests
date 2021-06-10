import $ from 'jquery';

window.listaCompras = [];

$('#button').click(function () {
  var toAdd = $('input[name=itemCompras]').val();
  $('ol').append('<li>' + toAdd + '</li>');
  $('input').val('');
  window.listaCompras.push(toAdd);
  localStorage.setItem('listaCompras', JSON.stringify(window.listaCompras));
});

if (localStorage.getItem('listaCompras')) {
  window.listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
  window.listaCompras.forEach((compra) => {
    $('ol').append('<li>' + compra + '</li>');
  });
}

$('input[name=itemCompras]').keyup(function (event) {
  if (event.keyCode == 13) {
    $('#button').click();
  }
});

$('form').on('submit', function (e) {
  e.preventDefault();
});

$(document).on('dblclick', 'li', function () {
  $(this)
    .toggleClass('strike')
    .fadeOut(500, function () {
      $(this).remove();
    });
  var indice = $('li').index($(this));

  window.listaCompras = window.listaCompras.filter(
    (compra, index) => indice != index
  );

  localStorage.setItem('listaCompras', JSON.stringify(window.listaCompras));
});
