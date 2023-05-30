// Recuperar as variáveis do armazenamento local
var valorCusto = parseFloat(localStorage.getItem('valorCusto')) || "";
var margemLucro = parseFloat(localStorage.getItem('margemLucro')) || "";
var notaFiscal = parseFloat(localStorage.getItem('notaFiscal')) || "";
var comissaoLoja = parseFloat(localStorage.getItem('comissaoLoja')) || "";
var taxaMaquininha = parseFloat(localStorage.getItem('taxaMaquininha')) || "";
var freteFixo = parseFloat(localStorage.getItem('freteFixo')) || "";
var custoFixo = parseFloat(localStorage.getItem('custoFixo')) || "";

// Preencher os campos com as informações recuperadas
document.getElementById('valor_custo').value = valorCusto;
document.getElementById('margem_lucro').value = margemLucro * 100;
document.getElementById('nota_fiscal').value = notaFiscal * 100;
document.getElementById('comissao_loja').value = comissaoLoja * 100;
document.getElementById('taxa_maquininha').value = taxaMaquininha * 100;
document.getElementById('frete_fixo').value = freteFixo;
document.getElementById('custo_fixo').value = custoFixo;

document.getElementById('calcular-button').addEventListener('click', function () {
  // Atualizar as variáveis com os novos valores
  valorCusto = parseFloat(document.getElementById('valor_custo').value);
  margemLucro = parseFloat(document.getElementById('margem_lucro').value) / 100;
  notaFiscal = parseFloat(document.getElementById('nota_fiscal').value) / 100;
  comissaoLoja = parseFloat(document.getElementById('comissao_loja').value) / 100;
  taxaMaquininha = parseFloat(document.getElementById('taxa_maquininha').value) / 100;
  freteFixo = parseFloat(document.getElementById('frete_fixo').value);
  custoFixo = parseFloat(document.getElementById('custo_fixo').value);

  var lucroBruto = valorCusto + (valorCusto * margemLucro);
  var lucroLiquido = valorCusto * margemLucro;

  var maxTentativas = 0;
  var valorFinal = lucroBruto;

  while (true) {
    var metaLucro = valorFinal - (valorFinal * (notaFiscal + comissaoLoja + taxaMaquininha)) - (freteFixo + custoFixo);

    if (Math.round(metaLucro * 100) === Math.round(lucroBruto * 100) || maxTentativas === 1000) {
      break;
    } else if (Math.round(metaLucro * 100) < Math.round(lucroBruto * 100) || maxTentativas === 1000) {
      valorFinal += metaLucro % lucroBruto;
      maxTentativas++;
    } else if (Math.round(metaLucro * 100) > Math.round(lucroBruto * 100) || maxTentativas === 1000) {
      valorFinal -= metaLucro % lucroBruto;
      maxTentativas++;
    }
  }

  // Salvar as variáveis no armazenamento local
  localStorage.setItem('valorCusto', valorCusto);
  localStorage.setItem('margemLucro', margemLucro);
  localStorage.setItem('notaFiscal', notaFiscal);
  localStorage.setItem('comissaoLoja', comissaoLoja);
  localStorage.setItem('taxaMaquininha', taxaMaquininha);
  localStorage.setItem('freteFixo', freteFixo);
  localStorage.setItem('custoFixo', custoFixo);

  document.getElementById('valor_venda').textContent = 'R$ ' + valorFinal.toFixed(2);
  document.getElementById('lucro_liquido').textContent = 'R$ ' + lucroLiquido.toFixed(2);
});