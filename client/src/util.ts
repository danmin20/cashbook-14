export const cloneNodeWithEvent = (orgNode: Element) => {
  const orgNodeEvents = orgNode.getElementsByTagName('*');
  const cloneNode = orgNode.cloneNode(true);
  const cloneNodeEvents = (cloneNode as Element).getElementsByTagName('*');

  const allEvents = new Array(
    'onchange',
    'onclick',
    'onfocus',
    'oninput',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onload',
    'onmousedown',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onmousewheel',
    'onscroll',
    'onsearch',
    'onselect',
    'onselectstart',
    'onsubmit'
  );

  // The node root
  for (let j = 0; j < allEvents.length; j++) {
    const event = allEvents[j];
    eval(
      `if ( orgNode.${event} )
          cloneNode.${event} = orgNode.${event}`
    );
  }

  // Node descendants
  for (let i = 0; i < orgNodeEvents.length; i++) {
    for (let j = 0; j < allEvents.length; j++) {
      const event = allEvents[j];
      eval(
        `if( orgNodeEvents[i].${event})
            cloneNodeEvents[i].${event}
            = orgNodeEvents[i].${event}`
      );
    }
  }

  return cloneNode;
};

export const stateCmp = (
  prevState: {},
  nextState: {}
): 'Same' | 'Different' => {
  if (JSON.stringify(prevState) === JSON.stringify(nextState)) {
    return 'Same';
  }
  return 'Different';
};
