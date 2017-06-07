/*
 * Simple Arithmetics Grammar
 * ==========================
 *
 * Derived from
 * https://github.com/pegjs/pegjs/blob/master/examples/arithmetics.pegjs
 *
 * Supports +-/*^(), as well as decimals and arbitrary functions.
 */
 
{
	const functions = {
    	INV: val => val * -1,
      SIN: val => Math.sin(val),
      COS: val => Math.cos(val),
      TAN: val => Math.tan(val),
      LOG: val => Math.log(val),
    }
}

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      var result = head, i;

      for (i = 0; i < tail.length; i++) {
        if (tail[i][1] === "+") { result += tail[i][3]; }
        if (tail[i][1] === "-") { result -= tail[i][3]; }
      }

      return result;
    }

Term
  = head:Power tail:(_ ("*" / "/") _ Power)* {
      var result = head, i;

      for (i = 0; i < tail.length; i++) {
        if (tail[i][1] === "*") { result *= tail[i][3]; }
        if (tail[i][1] === "/") { result /= tail[i][3]; }
      }

      return result;
    }
    
Power
  = base:Factor "^" exp:Factor { return Math.pow(base, exp) }
  / Factor

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / Primary
  
Primary 
  = method:[a-zA-Z]+ '(' _ expr:Expression _ ')' { 
    return functions[method.join('')](expr) 
  }
  / Real

Real "real"
  = Int:[0-9]+ "." Dec:[0-9]+ { return parseFloat(`${Int}.${Dec}`, 10); }
 / Integer
 
Integer "integer"
  = [0-9]+ { return parseFloat(text(), 10); }
  
_ "whitespace"
  = [ \t\n\r]*
