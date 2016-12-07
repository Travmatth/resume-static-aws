/* @flow */

export function Str(value: string): str {
  return {
    kind: 'String',
    value
  }
} 

export class Num {
	integer: number
	isDecimal: boolean
	fractional: ?number

	constructor(integer: number, isDecimal: boolean = false, fractional: ?number) {
		this.integer = integer
		this.isDecimal = isDecimal
		this.fractional = fractional
	}

  valueOf() {
    // Return fractional if avail, #.0 if empty fractional, # otherwise
    return this.isDecimal
      ? this.fractional == null
        ? parseFloat(`${this.integer}.0`) 
        : parseFloat(`${this.integer}.${this.fractional}`)
      : parseFloat(`${this.integer}`)
  }

	toString() {
    // Return fractional if avail, #.0 if empty fractional, # otherwise
    return this.isDecimal
      ? this.fractional == null
        ? `${this.integer}.0`
        : `${this.integer}.${this.fractional}`
      : `${this.integer}`
	}

	makeDecimal(): void {
		this.isDecimal = true
	}

	removeDecimal(): void {
		this.isDecimal = false
	}

	alter(val: number): void {
		this.isDecimal 
  		? this.fractional 
        ? this.fractional = this.fractional * 10 + val 
        : this.fractional = val
  		: this.integer = this.integer * 10 + val
	}

	// class will not erase itself
  // calling function should verify that num.length > 1 
	erase(): void {
    if (this.isDecimal && this.fractional) {
      this.fractional = parseFloat(`${this.fractional}`.substring(0, -1))
    } else if (this.isDecimal) {
      this.integer = parseFloat(`${this.integer}`.substring(0, -1))
    }
  }

  almostEmpty(): boolean {
    return `${this.integer}`.length === 1
  }
}
