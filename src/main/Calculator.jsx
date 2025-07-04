import React, { Component, useState } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
};

export default class Calculator extends Component {
    state = { ...initialState };

    constructor(props) {
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    //funcao para adicionar valor ao displai apos digitar
    //guardar valor digitado ao clicar em operacao
    //apagar tudo caso seja clicado o AC
    //limpar valor antigo da tela apos o novo click de outro valor
    //ao clicar em outra operacao ou igual exibir o resultado do valor

    // melhorias a fazer {
    //  acrescentar um tamanho maximo de caracteres
    //  resolver bug ao apertar:    = = = .
    //  if displayValue != 0 ? apagar displayValue ao digitar um novo número 
    //}

    clearMemory() {
        this.setState({ ...initialState });
    }

    setOperation(operation) {
        console.log(operation,'valor da operação')
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true });
        } else {
            const equals = operation === "=";
            const currentOperation = this.state.operation;

            const values = [...this.state.values];
            try {
                values[0] = eval(
                    `${values[0]} ${currentOperation} ${values[1]}`
                );
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory();
                    return;
                }
            } catch (e) {
                values[0] = this.state.values[0];
            }
            values[1] = 0;
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values: values,
            });
        }
    }

    addDigit(n) {
        //verificando se esta inserindo o ponto
        if (n === "." && this.state.displayValue.includes(".")) {
            return;
        }

        //verifica se o display está vazio. caso não esteja, seta cleardisplay false
        const clearDisplay =
            this.state.displayValue === "0" || this.state.clearDisplay;

        //caso o display tenha algum valor ele fica gravado nessa váriavel
        const currentValue = clearDisplay ? "" : this.state.displayValue;

        //acrescenta o valor digitado a esquerda do valor que há no display
        const displayValue = currentValue + n;

        //atualiza a variavel global do display com o novo valor e seta o clearDisplay para falso novamente
        this.setState({ displayValue, clearDisplay: false });

        //
        if (n !== ".") {
            //verica se está sendo digitado o primeiro valor ou segundo
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button
                    label="AC"
                    className="operation"
                    click={() => this.clearMemory()}
                    triple
                />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        );
    }
}
