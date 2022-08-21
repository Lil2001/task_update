import React, { useState, useMemo } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import Draggable from "react-draggable";



const Dashboard = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [childrenEditor, setChildrenEditor] = useState([{ children: '' }])
 
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const handleChildrenEditorAdd = () => {
    setChildrenEditor([...childrenEditor, { children: '' }]);
  }


  return (
    <div className="whiteDiv">
      <div className="nav">
        <h2 className="mb-1 ml-4">Profile</h2>
        <div>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </div>
        <div className="buttons-div">
          <Link to="/update-profile" className="btn btn-primary w-20 mt-1">
            Update Profile
          </Link>
          <div className="w-20 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="main">
        <div className="edit-text-div">
          <h2 >Create a new Text editor</h2>
          <Button onClick={handleChildrenEditorAdd} className="btn btn-primary w-120 mt-1 ml-2" >
            +
          </Button>
        </div>
        <ul className="characters" >
          {childrenEditor.map((value, index, id) => {
            return (
              <Draggable>
                <li
                  key={index}
                  className='text-editor children'>
                  <Slate editor={editor} value={initialValue} >
                    <Editable placeholder="Enter some plain text..." />
                  </Slate>
                </li>
              </Draggable>

            );
          })}

        </ul>

      </div>
    </div>
  )
}
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable plain text' },
    ],
  },
]

export default Dashboard