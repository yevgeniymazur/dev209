export function Header() {
  return React.createElement('div', null, [
    React.createElement('img', {
      key: 'logo',
      src: 'images/kinglogo.png',
      alt: 'King Logo',
      style: {
        width: '120px',
        display: 'block',
        margin: '0 auto 20px auto',
        borderRadius: '8px'
      }
    }),
    React.createElement('h1', { key: 'title' }, 'My Todo List')
  ]);
}
