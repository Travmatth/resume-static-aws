/* @flow */
import ExtendableError from 'extendable-error-class';

export function serialize(url: string, params: Object) {
  const query = [];

  if (params !== undefined) 
    url += "?"

  for (var property in params) {
    if (params.hasOwnProperty(property)) {
      query.push(encodeURIComponent(property) 
        + "=" 
        + encodeURIComponent(params[property]));
    }
  }

  return url + query.join("&");
}


export class ResponseError extends ExtendableError {
    response: Response;
    
    constructor(message: string, response: Response) {
      super(message);
      this.response = response
    }
}

//       <div key='partial' className='weather'>
//         <div className='control-bar'>
//           <button onClick={() => toggle('FARENHEIT')} className={farenheit}>
//             Farenheit
//           </button>
//           <button onClick={() => toggle('CELSIUS')} className={celsius}>
//             Celsius
//           </button>
//           <h1 className='heading'>{ weather.city }</h1>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <td>Day</td>
//               <td>Time</td>
//               <td>Temp</td>
//               <td/>
//               <td>Forecast</td>
//             </tr>
//           </thead>
//           <tbody>
//             { weatherJson.forecasts.map((val, i) => {
//               const { icon, temp, day, time, weather, description, } = val
//               const measurement = active('CELSIUS') 
//                 ? `${temp.celsius}°C`
//                 : `${temp.farenheit}°F`


//               return (
//                 <tr key={i}>
//                   <td>{ day }</td>
//                   <td>{ time }</td>
//                   <td>{ measurement }</td>
//                   <td><img key={icon} src={`${icon}`}/></td>
//                   <td>{ weather }: { description }</td>
//                 </tr>
//               )})
//             }
//           </tbody>
//         </table>
//       </div>