import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import App, {GET_ITEMS} from './App';

const mocks = [
    {
      request: {
        query: GET_ITEMS,
      },
      result: {
        data: {
          items: [
            {
                id: 1,
                description: "First todo item",
                checked: false,
            },
            {
                id: 2,
                description: "Second todo item",
                checked: false,
            },
            {
                id: 3,
                description: "Third todo item",
                checked: true,
            }
          ]
        }
      }
    }
];

describe("App", () => {
  test('it shows the list of fetched todo items', async () => {
    render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
    )

    await waitFor(() => expect(screen.findByText("To do list")).toBeTruthy())

    expect(screen.getByDisplayValue('First todo item')).toBeTruthy()
    expect(screen.getByDisplayValue('Second todo item')).toBeTruthy()
    expect(screen.getByDisplayValue('Third todo item')).toBeTruthy()
  })
  });
