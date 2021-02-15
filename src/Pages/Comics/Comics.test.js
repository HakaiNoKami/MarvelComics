import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { enableBatching } from "redux-batched-actions";

import thunk from "redux-thunk";

import Comics from "./Comics";

import { reduces } from "../../Containers/Store";

describe("Test for Comics container - Filter component", () => {
  it("should initial value when first render", () => {
    render(
      <Provider store={createStore(enableBatching(reduces), applyMiddleware(thunk))}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByAltText("Marvel Comics")).toBeInTheDocument();
  });

  it("should selected all comics on the current page", () => {
    render(
      <Provider store={createStore(enableBatching(reduces), applyMiddleware(thunk))}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Total comics selected: 0")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Select all comics on this page"));
    setTimeout(() => expect(screen.getByText("Total comics selected: 25")).toBeInTheDocument(), 1000);
    fireEvent.click(screen.getByText("Select all comics on this page"));
    setTimeout(() => expect(screen.getByText("Total comics selected: 0")).toBeInTheDocument(), 1000);
  });

  it("should the comics must change according to the filter", () => {
    let store = createStore(enableBatching(reduces), applyMiddleware(thunk));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    let titleFilterInput = screen.getByTestId("title");
    fireEvent.change(titleFilterInput, { target: { value: "captain marvel" } });
    setTimeout(() => expect(screen.getAllByText("captain marvel")).toHaveLength(), 1000);
    fireEvent.change(titleFilterInput, { target: { value: "iron man" } });
    setTimeout(() => expect(screen.getAllByText("iron man")).toHaveLength(), 1000);
  });
});

describe("Test for Comics container - Card comic component", () => {
  it("should checked select comic", () => {
    render(
      <Provider store={createStore(enableBatching(reduces), applyMiddleware(thunk))}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Total comics selected: 0")).toBeInTheDocument();
    setTimeout(() => fireEvent.click(screen.getByTestId("check-label-0")), 1000);
    setTimeout(() => expect(screen.getByText("Total comics selected: 1")).toBeInTheDocument(), 1000);
  });

  it("should open comics details", () => {
    render(
      <Provider store={createStore(enableBatching(reduces), applyMiddleware(thunk))}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(() => fireEvent.click(screen.getByTestId("learn-more-0")), 1000);
    setTimeout(() => expect(screen.getByAltText("bg-comic")).toBeInTheDocument(), 1000);
  });

  it("should click FAB button to send email without selected comic", () => {
    render(
      <Provider store={createStore(enableBatching(reduces), applyMiddleware(thunk))}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(() => fireEvent.click(screen.getByTestId("fab-to-mail")), 1000);
    setTimeout(() => expect(screen.getByText("Select some comic")).toBeInTheDocument(), 1000);
  });

  it("should click FAB button to send email with selected comic", () => {
    render(
      <Provider store={createStore(enableBatching(reduces), applyMiddleware(thunk))}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(() => fireEvent.click(screen.getByTestId("learn-more-0")), 1000);
    setTimeout(() => fireEvent.click(screen.getByTestId("fab-to-mail")), 1000);
    setTimeout(() => {
      expect(screen.getByText("Send all comics to email")).toBeInTheDocument();
      fireEvent.change(screen.getByTestId("email"), { target: { value: "mhfgmv@gmail.com" } });
      fireEvent.click(screen.getByTestId("send-email"));
    }, 1000);
    setTimeout(() => expect(screen.getByText("Success sending the comics")).toBeInTheDocument(), 1000);
  });

  it("should click FAB button to send email with selected comic without informing email", () => {
    render(
      <Provider store={createStore(enableBatching(reduces), applyMiddleware(thunk))}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>
    );
    setTimeout(() => fireEvent.click(screen.getByTestId("learn-more-0")), 1000);
    setTimeout(() => fireEvent.click(screen.getByTestId("fab-to-mail")), 1000);
    setTimeout(() => {
      expect(screen.getByText("Send all comics to email")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("send-email"));
    }, 1000);
    setTimeout(() => expect(screen.getByText("Error sending the comics")).toBeInTheDocument(), 1000);
  });
});
