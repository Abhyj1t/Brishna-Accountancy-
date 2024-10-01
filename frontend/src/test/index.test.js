import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';

// Optionally mock reportWebVitals inline or use the __mocks__ directory
// jest.mock('./reportWebVitals', () => jest.fn());

describe('Index rendering', () => {
  it('renders the App component without crashing', () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    const root = {
      render: jest.fn(),
    };
    jest.spyOn(ReactDOM, 'createRoot').mockReturnValue(root);

    require('../index');  // Import index file

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootElement);
    expect(root.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    document.body.removeChild(rootElement); // Clean up
  });
});
