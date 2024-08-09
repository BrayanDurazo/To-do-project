import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import TodoItem, {DELETE_ITEM, UPDATE_ITEM, item} from './todoItem';
import userEvent from '@testing-library/user-event';

const mocks = [
    {
        request: {
          query: DELETE_ITEM,
        },
        variableMatcher: jest.fn().mockReturnValue(true),
        result: {
          data: {
            item: {
              id: 1,
              description: "testing todo item",
              checked: false,
            }
          }
        }
    },
    {
        request: {
            query: UPDATE_ITEM,
        },
        variableMatcher: jest.fn().mockReturnValue(true),
        result: {
        data: {
        }
        }
    }
];

describe("todoItem", () => {
    const updateItemListMock = jest.fn()
    const removeItemFromListMock = jest.fn()

    const item: item = {
        id: 1,
        description: "testing todo item",
        checked: false,
    }

  test('it displays description and checked elements', async () => {
    render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TodoItem item={item} updateItemsList={updateItemListMock} removeItemFromList={removeItemFromListMock}/>
    </MockedProvider>
    )
    expect(screen.getByTestId('description-item-1')).toBeTruthy()
    expect(screen.getByTestId('checkbox-item-1')).toBeTruthy()
    expect(screen.getByTestId('deleteButton-item-1')).toBeTruthy()
  })

  test('it updates check element', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TodoItem item={item} updateItemsList={updateItemListMock} removeItemFromList={removeItemFromListMock}/>
        </MockedProvider>
    )

    const checkbox: HTMLInputElement = screen.getByTestId('checkbox-item-1')
    expect(checkbox.checked).toBeFalsy()

    await userEvent.click(screen.getByTestId('checkbox-item-1'))
    expect(checkbox.checked).toBeTruthy()
    expect(mocks[1].variableMatcher).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        input: {
            checked: true,
        }
    }));
  })

  test('it updates description element', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TodoItem item={item} updateItemsList={updateItemListMock} removeItemFromList={removeItemFromListMock}/>
        </MockedProvider>
    )

    expect(screen.getByDisplayValue('testing todo item')).toBeTruthy()

    await userEvent.type(screen.getByDisplayValue('testing todo item'), ' now updated')
    await userEvent.click(document.body)
    expect(mocks[1].variableMatcher).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        input: {
            description: 'testing todo item now updated',
        }
    }));
    expect(screen.getByDisplayValue('testing todo item now updated')).toBeTruthy()
  })

  test('it sends delete query of item', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TodoItem item={item} updateItemsList={updateItemListMock} removeItemFromList={removeItemFromListMock}/>
        </MockedProvider>
    )

    expect(screen.getByDisplayValue('testing todo item')).toBeTruthy()
    expect(screen.getByTestId('checkbox-item-1')).toBeTruthy()

    await userEvent.click(screen.getByTestId('deleteButton-item-1'))
    
    expect(mocks[0].variableMatcher).toHaveBeenCalledWith(expect.objectContaining({
        id: 1
    }));
  })
});