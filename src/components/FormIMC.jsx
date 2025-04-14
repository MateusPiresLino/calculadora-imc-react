import {useState, useEffect} from 'react';
import styles from './FormIMC.module.css';


function FormImc () {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [resultado, setResultado] = useState('');
    const [historico, setHistorico] = useState([]);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        if (resultado) {
            setMensagem('Resultado calculado com sucesso!');

            const timeout = setTimeout(() => {
                setMensagem('');

            }, 3000); // 3 segundos
            return () => clearTimeout(timeout); // Limpa o timeout se o componente for desmontado ou o resultado mudar
        }
    }, [resultado]);

    const calcularIMC = (e) => {
        e.preventDefault();

        const pesoNum = parseFloat(peso);
        const alturaNum = parseFloat(altura);

        if(!pesoNum || !alturaNum) {
            setMensagem('Por favor, insira valores válidos.');
            return;
        }

        const imc = pesoNum / (alturaNum * alturaNum).toFixed(1);
        let categoria = '';

        if (imc < 18.5) {
            categoria = 'Magreza';
        } else if (imc < 24.9) {
            categoria = 'Normal';
        } else if (imc < 29.9) {
            categoria = 'Sobrepeso';
        } else if (imc < 39.9) {
            categoria = 'Obsidade';
        } else {
            categoria = 'Obsidade grave';
        }

        setResultado(`Seu IMC é ${imc.toFixed(1)} - ${categoria}`);
        
        setHistorico((prev) => [
            ...prev,
        
            `IMC: ${imc.toFixed(1)} - ${categoria}`
        ]);
        
        // Limpar os campos após o cálculo
        setPeso('');
        setAltura('');
    };

    return (
        <div className={styles.container}>
            <h1>Calculadora de IMC</h1>
            <form onSubmit={calcularIMC}>
                <div>
                    <label htmlFor="" className={styles.label}>Peso (Kg):</label>
                    <input className={styles.input} type="number" value={peso} onChange={(e) => setPeso(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="" className={styles.label}>Altura (m):</label>
                    <input className={styles.input} type="number" step="0.01" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder='Ex: 1.75'/>
                </div>

                <button className={styles.button} type='Submit'>Calcular IMC</button>
                <p style={{ color: mensagem.includes('sucesso') ? 'lightgreen' : 'red' }}>{mensagem}</p>
            </form>
            {resultado && <p className={styles.resultado}>{resultado}</p>}

            {historico.length > 0 && (
                <div className={styles.historico}>
                    <h2>Histórico de Cálculos:</h2>
                    <ul>
                        {historico.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FormImc;