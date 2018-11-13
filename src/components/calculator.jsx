import React, { Component } from "react";
import logo from "../logo.svg";
import Buttons from './buttons'
import Display from './display'
import Button from './button'
import update from 'immutability-helper'
import math from 'mathjs'

class Calculator extends Component {
    constructor() {
        super()
        this.state = { operations: [] };
    }

    handleClick = e => {
        const value = e.target.getAttribute('data-value')
        switch (value) {
            case 'clear':
                this.setState({
                    operations: [],
                })
                break
            case 'equal':
                this.calculateOperations()
                break
            default:
                const newOperations = update(this.state.operations, {
                    $push: [value],
                })
                this.setState({
                    operations: newOperations,
                })
                break
        }
    }

    calculateOperations = () => {
        let result = this.state.operations.join('')
        if (result) {
            result = math.eval(result)
            result = math.format(result, { precision: 14 })
            result = String(result)
            this.setState({
                operations: [result],
            })
        }
    }

    addButtons = () => {
        let blabel = ["C", "7", "4", "1", ".", "/", "8", "5", "2", "0", "X", "9", "6", "3", "", "-"]
        let bvalue = ["clear", "7", "4", "1", ".", "/", "8", "5", "2", "0", "*", "9", "6", "3", "null", "-"]
        let buttons = []
        for(let i = 0; i < blabel.length; i++){
            buttons.push( <Button onClick={this.handleClick} label={blabel[i]} value={bvalue[i]} />)
        }
        return buttons
    }

    render() {
        return <div className="Calculator">
            <img src={logo} className="App-logo" alt="logo" />
            <Display data={this.state.operations} />
            <Buttons>
              {this.addButtons()}

              <Button onClick={this.handleClick} label="+" size="2" value="+" />
              <Button onClick={this.handleClick} label="=" size="2" value="equal" />
            </Buttons>
          </div>;
    }
}

export default Calculator