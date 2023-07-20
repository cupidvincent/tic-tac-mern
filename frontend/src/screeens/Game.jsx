
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ActionButton from '../components/ActionButton'
import { endgame } from '../slices/authSlice';
import { clearBoard } from '../slices/boardSlice';
import { toast } from 'react-toastify';
import { updateBoard, setWinner } from '../slices/boardSlice'
import { checkWinner, checDraw } from '../lib/CheckWinner';
import GameModal from '../components/GameModal';
import { createBoard } from '../lib/CheckWinner';
import { resetBoard } from '../slices/boardSlice';
import { useUpdateGAmeMutation, useEndGameSessionMutation } from '../slices/gameApiSlice';


export default function Game() {
    
    const { gameInfo } = useSelector((state) => state.auth)
    const { boardDatas } = useSelector((state) => state.board)
    const [updateGame, { isLoading } ] = useUpdateGAmeMutation()
    const [endGameSession ] = useEndGameSessionMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isXwon = checkWinner(boardDatas.playedBoard, 'X')
    const isOwon = checkWinner(boardDatas.playedBoard, 'O')

    let [board, setBoard] = useState([
        ['','',''],
        ['','',''],
        ['','','']
    ])

    const [modalProps, setModalProps] = useState({
        title: '',
        message: '',
        visible: false
    })
    const [gameInitialized, setInitialized] = useState(false)

    const [playerTurn, setPlayerTurn] = useState(false)

    const configureModal = ({mTitle, mMessage, show}) => {
        setModalProps({
            title: mTitle,
            message: mMessage,
            visible: show
        })
    }

    const toggleModal = () => {
        setModalProps({...modalProps, visible: !modalProps.visible})
    }

    const recordResult = async () => {
        try {
            const res = await updateGame({
                gameId: gameInfo._id,
                winner: boardDatas.winner,
                mode: gameInfo.mode
            }).unwrap();

            if(res) {
                return true;
            }
        } catch (error) {
            toast.error(error.data.message || error.error)
            return false;
        }
    }

    const nextRound = async (e) => {
        e.preventDefault()
        setInitialized(false)
        const newBoard = createBoard(gameInfo.mode, gameInfo.mode)
        dispatch(resetBoard({
            playedBoard: [...newBoard],
            turn: false,
            winner: ''
        }))
        setModalProps({
            title: '',
            message: '',
            visible: false
        })
    }

    useEffect(() => {

        if(!isXwon && !isOwon) {
            setBoard(boardDatas.playedBoard)
            setPlayerTurn(boardDatas.turn)
            const isDraw = checDraw(boardDatas.playedBoard);
            if(isDraw) {
                configureModal({
                    mTitle: `Wow tha'ts a Draw! that the next round should be given to the better player!`,
                    mMessage: 'Do you want to want end the game or proceed to next Round?',
                    show: true
                })
            }
        }

        if(isXwon || isOwon) {
            const winner = isOwon ? gameInfo.player_x : gameInfo.player_o;
            const winnerSymbol = isOwon ? 'O' : 'X'
           
            configureModal({
                mTitle: `${winner} Won! Congratulations`,
                mMessage: 'Do you want to want end the game or proceed to next Round?',
                show: true
            })
            dispatch(setWinner(winnerSymbol))
            
            if(gameInitialized && boardDatas.winner){
                recordResult();
            }
        }
    },[boardDatas, navigate])

    const endGameNow = async () => {
        try {
            const res = await endGameSession().unwrap();

            if(res) {
                dispatch(clearBoard())
                dispatch(endgame())
                setInitialized(false)
                navigate('/')
            }
        } catch (error) {
            toast.error(error.data.message || error.error)
        }
    }

    const placeValue = (rowId, tileId) => {
        const isVacant = board[rowId][tileId] === '';
        
        if(isVacant) {
            dispatch(updateBoard({rowId, tileId, turn: playerTurn}))
            setInitialized(true)
        } else {
            toast.error('Cannot place position on a tile that has already have a value!')
        }
    }
    
  return (
    <div className='d-flex flex-column rounded border  p-4 justify-content-center align-items-center'>
        <GameModal 
            modalProps={modalProps}
            toggleModal={toggleModal}
            endGameNow={endGameNow}
            nextRound={nextRound}
        />
        <h1>{`Your turn now, ${!boardDatas.turn ? gameInfo.player_x : gameInfo.player_o}!`}</h1>
        <Table  bordered variant="light" className='w-50' style={{height: 'auto', width: 'auto', minHeight: '250px', minWidth: '250px', maxHeight: '250px', maxWidth: '250px'}}>
            <tbody>
            {
                        board.map((col,cindex) => {
                            return(
                                <tr key={cindex} id={cindex}>
                                    {col.map((rowVal, rindex) => {
                                        return(
                                            <td
                                                style={{height: `${100/board.length}%`, width: `${100/board.length}%`, textAlign: 'center'}}
                                                id={`${cindex}-${rindex}`} key={`${cindex}-${rindex}`}
                                                onClick={() => placeValue(cindex,rindex)}
                                                className='position-relative'
                                            >
                                                {rowVal ?  
                                                    <div className='m-auto h-100 d-flex justify-content-center align-items-center position-absolute top-0 start-0 bottom-0 end-0' >
                                                        <h1 className={`${rowVal === 'X' ? 'text-danger' : 'text-black'} m-auto`} style={{fontSize: gameInfo.mode === 3 ? '4em' : gameInfo.mode === 7 ? '1.5em' : '3em', fontWeight: 'bolder'}}>{rowVal}</h1>
                                                    </div> :  ''
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                }
            </tbody>
        </Table>
        {/* <div className='d-flex flex-column'>
            <h1>Actions</h1>
            <ActionButton 
                variant={'danger'}
                to={'/'}
                action={ () => endGameNow()}
                label={'End Game'}
            />
        </div> */}
    </div>
  )
}
