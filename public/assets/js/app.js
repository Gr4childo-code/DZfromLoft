console.log('Client script');

document.querySelectorAll('.form-email__button').forEach(function (e) {
	e.addEventListener('click', function () {
		alert('Сообщение отправлено');
	});
});
