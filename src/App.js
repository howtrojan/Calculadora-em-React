// Importando estilos e componentes necessários
import { Container, Content, Row } from './styles.js';
import Input from './components/Input';
import Button from './components/Button/index.js';
import { useState } from 'react';

// Definindo o componente funcional principal chamado App
const App = () => {
  // Definindo estados iniciais usando o hook useState
  const [currentNumber, setCurrentNumber] = useState(' ');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');
  

  // Função para adicionar um número ao número atual
  const handleAddNumber = (num) => {
    setCurrentNumber((prev) => {
      // Verifica se o caractere inserido é um número ou operador válido
      if (/^[0-9+\-*/.%]+$/.test(num)) {
        // Verifica se já existe um ponto decimal no número atual
        if (num === '.' && prev.includes('.')) {
          return prev;
        }
        // Atualiza o número atual
        return `${prev === '0' ? '' : prev}${num}`;
      } else {
        // Tratamento de erro: Caractere inválido
        console.error('Caractere inválido inserido.');
        // Ou você pode definir uma mensagem de erro para exibir ao usuário
        // setErrorMessage('Caractere inválido inserido.');
        return prev;
      }
    });
  };
  
  

  // Função para limpar todos os estados
  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
    setOperation('');    
  };

  // Função para somar dois números
  const handleSumNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('+');
    } else {
      const sum = parseFloat(firstNumber) + parseFloat(currentNumber);
      setCurrentNumber(String(sum));
      setOperation('');
    }    
  };

  const handleOff = () => {
    // Limpa todos os estados para reiniciar o aplicativo
    setCurrentNumber(' ');
    setFirstNumber('0');
    setOperation('');
    
  };

  // Função para subtrair dois números
  const handleMinNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('-');
    } else {
      const sub = parseFloat(firstNumber) - parseFloat(currentNumber);
      setCurrentNumber(String(sub));
      setOperation('');
    }    
  };

  // Função para multiplicar dois números
  const handleMulNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('*');
    } else {
      const mul = parseFloat(firstNumber) * parseFloat(currentNumber);
      setCurrentNumber(String(mul));
      setOperation('');
    }    
  };

  // Função para dividir dois números
  const handleDivNumbers = () => {
    if (firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('/');
    } else {
      const divisor = parseFloat(currentNumber);
      if (divisor !== 0) {
        const div = parseFloat(firstNumber) / divisor;
        setCurrentNumber(String(div));
        setOperation('');
      } else {
        // Tratamento de erro: Divisão por zero não é permitida
        console.error('Divisão por zero não é permitida.');
        // Ou você pode definir uma mensagem de erro para exibir ao usuário
        // setErrorMessage('Divisão por zero não é permitida.');
      }
    }
  };
  

  // Função para calcular a porcentagem do número atual
  const handlePercent = () => {
    const percentValue = parseFloat(currentNumber) / 100;
    setCurrentNumber(String(percentValue));
  };

  // Função para calcular a raiz quadrada do número atual
  const handleSquareRoot = () => {
    const squareRootValue = Math.sqrt(parseFloat(currentNumber));
    setCurrentNumber(String(squareRootValue));
  };

  // Função para lidar com o botão de igualdade
  const handleEquals = () => {
    if (operation !== '' && currentNumber !== '0') {
      switch (operation) {
        case '+':
          handleSumNumbers();
          break;
        case '-':
          handleMinNumbers();
          break;
        case '*':
          handleMulNumbers();
          break;
        case '/':
          handleDivNumbers();
          break;
        default:
          break;
      }
  
      // Atualiza firstNumber apenas se a operação não for vazia
      if (operation !== '') {
        setFirstNumber(currentNumber);
      }
  
      // Limpa a operação, permitindo a entrada de uma nova operação
      setOperation('');      
    }
  };
  

  // Retorna a estrutura do componente, incluindo o Container, Content, Input, e botões organizados em linhas
  return (
    <Container>
      <Content>
        <Input value={currentNumber}></Input>
        <Row>
          <Button label="C" onClick={() => handleOnClear()} />
          <Button label="OFF" onClick={() => handleOff()} />
          <Button label="%" onClick={() => handlePercent()} />
          <Button label="√" onClick={() => handleSquareRoot()} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="x" onClick={() => handleMulNumbers()} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="/" onClick={() => handleDivNumbers()} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="+" onClick={() => handleSumNumbers()} />
        </Row>
        <Row>
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="." onClick={() => handleAddNumber('.')} />
          <Button label="=" onClick={() => handleEquals()} />
          <Button label="-" onClick={() => handleMinNumbers()} />
        </Row>
      </Content>
    </Container>
  );
};

// Exporta o componente App
export default App;
