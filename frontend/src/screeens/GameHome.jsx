import React, { useState, useEffect } from 'react'
import GameHistoryData from '../components/GameHistoryData'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useCreateGameMutation, useGetGameHistoryMutation } from '../slices/gameApiSlice';
import { setGameInfos, endgame } from '../slices/authSlice';
import { resetBoard } from '../slices/boardSlice';
import { createBoard } from '../lib/CheckWinner';
import { ParseHistory } from '../lib/ParseGameHistory';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function GameHome() {

    const [mode, setMode] = useState(3)
    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
    const [gameHistory, setGameHistory] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [createGame, { isLoading } ] = useCreateGameMutation()
    const [getGameHistory ] = useGetGameHistoryMutation()
    const getGame = async () => {
        const res = await getGameHistory().unwrap();
        const parsed = ParseHistory(res)
        setGameHistory(parsed)
    }

    useEffect(() => {
        getGame()
    },[])

    const startGame = async (e) => {
        e.preventDefault()
        try {
            const res = await createGame({
                player_x: player1,
                player_o: player2,
                mode
            }).unwrap();

            dispatch(setGameInfos({
                ...res
            }))

            const constructedBoard = createBoard(mode, mode)

            dispatch(resetBoard({
                playedBoard: [...constructedBoard],
                turn: false,
                winner: ''
            }))

            navigate('/gamestart')
        } catch (error) {
            toast.error(error.data.message || error.error)
        }
    }

    const { gameInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(gameInfo) {
            navigate('/gamestart')
        }
    },[navigate, gameInfo])

  return (
    <div>
        {/* <h1 className='text-center p-5'>Welcome to Tic Tac Toe</h1> */}
        {/* <div className='d-flex flex-row  md:flex-column w-100 m-auto justify-content-center align-items-center gap-2 pt-5'>  */}
        <Container>
            <Row>
                <Col xs={12} sm={7} md={8} className='d-flex align-items-center'>
                    <GameHistoryData gameHistory={gameHistory}/>
                </Col>
                <Col xs={12} sm={5} md={4}>
                    <div className='d-flex flex-column p-4 gap-2'>
                        <h3>Start new game</h3>
                        <Form className='d-flex flex-column p-4 gap-2' onSubmit={startGame}>
                            <Form.Select className='w-100' value={mode} onChange={(e) => setMode(e.target.value)}>
                                <option value={3}>Easy 3x3</option>
                                <option value={4}>Medium 4x4</option>
                                <option value={7}>Hard 7x7</option>
                            </Form.Select>
                            <Form.Label htmlFor="Playername_1">Player for <span className='text-danger'>X</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="Playername_1"
                                onChange={(e) => setPlayer1(e.target.value)}
                                value={player1}
                                required
                            />
                            <Form.Label htmlFor="Playername_2">Player for <span className='text-black'>O</span></Form.Label>
                            <Form.Control
                                type="text"
                                id="Playername_2"
                                onChange={(e) => setPlayer2(e.target.value)}
                                value={player2}
                                required
                            />
                            <Button
                                variant={'primary'}
                                type={'submit'}
                            >
                                Start Game!
                            </Button>
                        </Form>
                    </div>
                </Col>
            {/* </div> */}
            </Row>
        </Container>
       
    </div>
  )
}
