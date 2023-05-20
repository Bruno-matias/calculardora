document.getElementById('calcular-button').addEventListener('click', function () {
    var valorCusto = parseFloat(document.getElementById('valor_custo').value);
    var margemLucro = parseFloat(document.getElementById('margem_lucro').value) / 100;
    var notaFiscal = parseFloat(document.getElementById('nota_fiscal').value) / 100;
    var comissaoLoja = parseFloat(document.getElementById('comissao_loja').value) / 100;
    var taxaMaquininha = parseFloat(document.getElementById('taxa_maquininha').value) / 100;
    var freteFixo = parseFloat(document.getElementById('frete_fixo').value);
    var custoFixo = parseFloat(document.getElementById('custo_fixo').value);
  
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
  
    document.getElementById('valor_venda').textContent = 'R$ ' + valorFinal.toFixed(2);
    document.getElementById('lucro_liquido').textContent = 'R$ ' + lucroLiquido.toFixed(2);
  });
  
