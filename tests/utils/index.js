const dispatch = (selector: string | HTMLElement, type: string | Event) => {
  const element = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  var event = typeof type === 'string'
    ? new CustomEvent(type, { target: element })
    : type;
  element.dispatchEvent(event);
};

const json = (m: Object): string => JSON.stringify(m);

export { json, dispatch };
