var atual = "menu";

function tela(nova){
	var anterior = atual;
	atual = nova;
	document.getElementById(atual).className = "vis";
	document.getElementById(anterior).className = "inv";
}

function menu(opcoes){
	switch(opcoes){
		case 1:
		    tela("inserir");
		    break;
		case 2:
		    tela("buscar");
		    break;
		case 3:
		    tela("mostrar");
		    mostrar();
		    break;
		case 4:
		    tela("editar");
		    resultedi.className = "invi";
		    break;
		case 5:
		    tela("excluir");
		    break;
		default:
		    alert("Essa opção não existe, escolha uma entre 1 e 5.");
		    break;

	}
}

let ls ={
	inserir: (colecao, objeto) => {
		let colecaols = localStorage.getItem(colecao) ? JSON.parse(localStorage.getItem(colecao)) : [];
		colecaols.push(objeto);
		localStorage.setItem(colecao, JSON.stringify(colecaols));

	},
	listar: colecao => JSON.parse(localStorage.getItem(colecao))
};

function inserir(){
     

	ls.inserir('Troca de Livros', {
		nome: nomeins.value,
		id: idins.value,
		email: emailins.value
	});

	alert("Livro cadastrado!");
	nomeins.value = '';
	idins.value = '';
	emailins.value = '';
}

function buscar(nomebusc){
	let flag = true;
	let livros = ls.listar('Troca de Livros') || [];
	let text = document.getElementById("result");
	text.innerHTML = "";

	if (livros.length == 0){

		alert("Não há cadastros!");
	}else{
		livros.forEach(objeto => {
			if(objeto.nome == nomebusc){
				flag = false;
				text.innerHTML += `Nome: ${objeto.nome}<br>
				ID do livro: ${objeto.id}<br>
				E-mail: ${objeto.email}<br>
				<hr>`
			}
		});
		if (flag){
			alert("Livro não encontrado!");
		}
	}
}

function mostrar(){
	let livros = ls.listar('Troca de Livros') || [];
	let text = document.getElementById("mostbot");
	text.innerHTML = "";

	if (livros.length == 0){
		alert("Não há cadastros!");
	}else{
		livros.forEach(objeto => {
			text.innerHTML += `Nome do livro: ${objeto.nome}<br>
				ID do livro: ${objeto.id}<br>
				E-mail do cadastrador: ${objeto.email}<br>
				<hr>`
		});
	}

	text.innerHTML += "<button onclick = tela('menu');>Voltar</button>";
}

var posicao_editar=-1;

function editar(opcoes,idd){
	if (opcoes == "1"){
		let flag = true;
		let livros = ls.listar('Troca de Livros') || [];
		let text = document.getElementById("resultedi");
		text.innerHTML = "";

		if (livros.length == 0){

			alert("Não há cadastros!"); 
		}else{
			livros.forEach((objeto,indice) => {
				if (objeto.id == idd){
					flag = false;
					posicaoedi = indice;
					document.getElementById("formedi").className = "vis";
					nomeedi.value = objeto.nome;
					idedi.value = objeto.id;
					emailedi.value = objeto.email;
				}
			});
			if (flag){

				alert("Cadastro não encontrado!");
			}
		}
	}else{
		let livros = ls.listar('Troca de Livros') || [];
		livros[posicaoedi].nome = nomeedi.value;
		livros[posicaoedi].id = idedi.value;
		livros[posicaoedi].email = emailedi.value;

		localStorage.setItem("Troca de Livros", JSON.stringify(livros));
		alert("Edição concluída com sucesso!");
		tela('menu');
	}
}

function apagar(idd){
	let resposta = false;
	let flag = false;
	let posicao;
	let livros = ls.listar('Troca de Livros') || [];
	let text = document.getElementById("idexc");
	text.innerHTML = "";

	if (livros.length == 0){

		alert("Não há cadastros!");

	}else{
		livros.forEach((objeto,indice) => {
			if (objeto.id == idd){
				flag = true;
				posicao = indice;
			}
		});
		if (flag){
			resposta = confirm("Deletar o cadastro "+livros[posicao].nome + "?");
			if (resposta){
				livros.splice(posicao,1);
				localStorage.setItem("Troca de Livros", JSON.stringify(livros));
				alert("Cadastro apagado!")
				tela("menu");
			}
		}else{
			alert("Livro não encontrado!");
		}
	}
}