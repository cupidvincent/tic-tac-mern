import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';

export default function GameHistoryData({gameHistory}) {

  return (
    <div className='d-flex flex-column rounded border  p-4 w-100'>
        <h1>Previous Game Datas</h1>
        <Table responsive  striped bordered variant="dark">
            <thead>
                <tr>
                <th className='text-center'>Winner</th>
                <th className='text-center'>Rounds</th>
                <th className='text-center'>Score</th>
                <th className='text-center'>Mode</th>
                </tr>
            </thead>
            <tbody>
                {
                  gameHistory.length > 0 && gameHistory.map((data,index) =>{

                    return(
                      <tr key={index}>
                        <td className={`text-center ${data.winner === 'DRAW' ? '' : data.winner === 'X' ? 'text-danger' : 'text-white'}`}>{data.winner}</td>
                        <td className='text-center'>{data.rounds}</td>
                        <td className='text-center'>{data.score}</td>
                        <td className='text-center'>{data.mode}</td>
                      </tr>
                    )
                  })
                }

            </tbody>
        </Table>
    </div>
  )
}
