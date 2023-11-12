import { useState } from "react";
import "./App.css";

const Square = ({ value, onSquareClick }) => {
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
};

export const Board = () => {
	const [nextValue, setNextValue] = useState(false);
	const [squares, setSquares] = useState(Array(9).fill(null));

	const handleClick = (i) => {
		if (squares[i] || CalculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		if (!nextValue) nextSquares[i] = "X";
		else nextSquares[i] = "O";
		setSquares(nextSquares);
		setNextValue(!nextValue);
	};

	const winner = CalculateWinner(squares);
	let status;
	if (winner !== "tie" && winner) {
		status = "Winner : " + winner;
	} else if (winner === "tie") {
		status = "Tie";
	} else {
		status = "Now " + (!nextValue ? "X" : "O") + "'s : Turn";
	}

	return (
		<div className="main-content">
			<div className="left-content">
				<div className="status" style={{textAlign:'center'}}>{status}</div>
				<div className="board-row">
					<Square
						value={squares[0]}
						onSquareClick={() => handleClick(0)}
					/>
					<Square
						value={squares[1]}
						onSquareClick={() => handleClick(1)}
					/>
					<Square
						value={squares[2]}
						onSquareClick={() => handleClick(2)}
					/>
				</div>
				<div className="board-row">
					<Square
						value={squares[3]}
						onSquareClick={() => handleClick(3)}
					/>
					<Square
						value={squares[4]}
						onSquareClick={() => handleClick(4)}
					/>
					<Square
						value={squares[5]}
						onSquareClick={() => handleClick(5)}
					/>
				</div>
				<div className="board-row">
					<Square
						value={squares[6]}
						onSquareClick={() => handleClick(6)}
					/>
					<Square
						value={squares[7]}
						onSquareClick={() => handleClick(7)}
					/>
					<Square
						value={squares[8]}
						onSquareClick={() => handleClick(8)}
					/>
				</div>
			</div>
			<div className="right-content">
				<button onClick={()=>{setSquares(Array(9).fill(null))}}>Reset</button>
			</div>
		</div>
	);
};

const CalculateWinner = (squares) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 9],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}
	if (squares.every((square) => square !== null)) {
		return "tie";
	}
	return null;
};

const App = () => {
	return <Board />;
};
export default App;
