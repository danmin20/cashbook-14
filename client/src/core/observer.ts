type GlobalStateType = {
  [key: string]: { _state: unknown; _observers: Map<string, Function> };
};
const globalState: GlobalStateType = {};

const subscribe = (key: string, className: string, observer: Function) =>
  globalState[key]._observers.set(className, observer);

const _notify = (key: string) =>
  globalState[key]._observers.forEach((observer: Function) => observer());

const initState = ({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: unknown;
}) => {
  if (key in globalState) throw Error('이미 존재하는 key값 입니다.');
  globalState[key] = {
    _state: defaultValue,
    _observers: new Map(),
  };
  return key;
};

const getState = (key: string) => {
  if (!(key in globalState)) throw Error('존재하지 않는 key값 입니다.');
  return globalState[key]._state;
};

const setState = (key: string) => (newState: unknown) => {
  if (!(key in globalState)) throw Error('존재하지 않는 key값 입니다.');

  if (typeof newState === 'function') {
    const state = getState(key);
    globalState[key]._state = newState(state);
  } else {
    globalState[key]._state = newState;
  }

  _notify(key);
};

export { subscribe, initState, getState, setState };
