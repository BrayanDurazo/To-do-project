import {render, screen} from '@testing-library/react';
import {MockedProvider} from "@apollo/client/testing";
import TodoList, {ADD_ITEM} from './todoList';
import {item} from './../todoItem/todoItem';
import userEvent from '@testing-library/user-event'

const mocks = [
    {
      request: {
        query: ADD_ITEM,
        variables: { 
          input: {
            description: "",
            checked: false,
          }
        }
      },
      result: {
        data: {
          item: {
            id: 4,
            description: "",
            checked: false,
          }
        }
      }
    }
];

describe("TodoList", () => {
    const items: Array<item> = [{
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

    test('it adds a new item in the todo list', async () => {
        render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <TodoList items={items} />
        </MockedProvider>
        )

        expect(screen.getByTestId('description-item-1')).toBeTruthy()
        expect(screen.getByTestId('description-item-2')).toBeTruthy()
        expect(screen.getByTestId('description-item-3')).toBeTruthy()
        expect(screen.queryByTestId('description-item-4')).toBeFalsy()

        await userEvent.click(screen.getByText('+ add item'))

        expect(screen.getByTestId('description-item-1')).toBeTruthy()
        expect(screen.getByTestId('description-item-2')).toBeTruthy()
        expect(screen.getByTestId('description-item-3')).toBeTruthy()
        expect(screen.getByTestId('description-item-4')).toBeTruthy()
    })
  });
