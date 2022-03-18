	(() => { //Чтобы скрипт начал работать только после загрузки страницы
			
		// делаю ajax запрос на сервер по указанному адресу
		$.get( "http://217.71.129.139:4003/students.php", function(data) {
			// найти на странице div с классом "tabs"
			let tabs = document.querySelector('.tabs');
			// взять из ответа сервера, только нужные данные
			let response = JSON.parse(data).response;
			// вспомогательные переменные
			let groups = {};
			let titles = document.createElement('ul');
			let blocks = [];
			let counter = 1;
			
			// перебираем ответ сервера и создаем новый объект, где ключом будет имя группы, а значением - массив со всеми записями для данной группы
			response.forEach((item) => {
				let group = item['group'] ?? 'Без группы';
				groups[group] = groups[group] ?? [];
				groups[group].push(item);
			});
				
			// перебираем созданный объект создавая html структуру для заголовков и соответствующих им блоков с таблицами
			for (const group in groups) {
				titles.innerHTML += '<li><a href="#tabs-' + counter + '">' + group + '</a></li>';

				let block = document.createElement('div');
				block.setAttribute('id', 'tabs-' + counter);
						
				let table = document.createElement('table');
				table.innerHTML = '<tr><td>ID</td><td>Фамилия</td><td>Имя</td><td>Средняя оценка</td></tr>';
				table.insertAdjacentHTML('beforeend', groups[group].map((item) => {
					return '<tr><td>' + item.id + '</td><td>' + item.surname + '</td><td>' + item.name + '</td><td>' + average(item.scores) + '</td></tr>';
				}).join(''));
					
				block.append(table);
				blocks.push(block);
				counter++;
			}
				
			// добавляем заголовки и блоки в div с классом "tabs"
			tabs.append(titles);
			tabs.append(...blocks);
				
			// инициируем UI tabs для этого div-a
			$(tabs).tabs();

			// console.log(groups);
		});
			
		// функция для вычисления среднего значения набора оценок
		function average(nums) {
			if(Array.isArray(nums)) {
				let num = nums.reduce((a, b) => (a + b)) / nums.length;
				return num.toFixed(1);
			}
		}
	
	})();
		