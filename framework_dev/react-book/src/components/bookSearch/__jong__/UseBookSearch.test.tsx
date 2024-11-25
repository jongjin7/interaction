import Counter from "./MyComponent";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

interface ProfileProps {
  name: string;
  userName: string;
}
const Profile = ({ name, userName }: ProfileProps) => {
  return (
    <div>
      <span>{userName}</span>{" "}
      <p>
        의 프로파일 요소: <span>({name})</span>
      </p>
    </div>
  );
};

describe("Counter", () => {
  function renderCounter() {
    return render(<Counter />);
  }

  it("renders correctly", () => {
    renderCounter();

    // Count: 0 검증
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    // Increment 버튼 클릭
    const incrementButton = screen.getByRole("button", { name: "+" });
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    // Count: 1로 업데이트되었는지 확인
    expect(screen.getByText("Count: 3")).toBeInTheDocument();
  });

  it("decrements count when - button is clicked", () => {
    renderCounter();

    // Count: 0 검증
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    // Decrement 버튼 클릭
    const decrementButton = screen.getByRole("button", { name: "-" });
    fireEvent.click(decrementButton);

    // Count: -1로 업데이트되었는지 확인
    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  it("올바른 props 입력을 확인", () => {
    const { getByText } = render(
      <Profile userName={"goodjam"} name={"재모"} />,
    );
    expect(getByText("goodjam")).toBeTruthy(); // goodjam 텍스트를 가진 엘리먼트가 있는지 확인
    expect(getByText("(재모)")).toBeTruthy(); // (JAEMO) 텍스트를 가진 엘리먼트가 있는지 확인
    expect(getByText(/모/)).toBeTruthy(); //정규식도 사용 가능
  });
});
