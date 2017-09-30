const dispatch = (
  selector: string | HTMLElement,
  type: string | Event,
  data = {},
) => {
  const element = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector;
  const event = typeof type === 'string'
    ? new CustomEvent(type, { target: element, ...data })
    : type;
  element.dispatchEvent(event);
};

const json = (m: Object): string => JSON.stringify(m);

export { json, dispatch };
