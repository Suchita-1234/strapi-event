/*
 *
 * HomePage
 *
 */

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditModal from "./EditModal";
import pluginId from "../../pluginId";
function HomePage() {
  const [eventId, setEventId] = useState<string>("");
  const [showData, setShowData] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (id : string) => {
    setShow(true);
    setEventId(id);
  };
  const handleDelete = async (id : string) => {
    let headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.delete(`https://localhost:1337/events/${id}`, {
        headers,
      });
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getData = async () => {
    let headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get("https://localhost:1337/events", {
        headers,
      });
      setShowData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      style={{ width: "50%", padding: 30 }}
      className="d-flex justify-content-center flex-column m-auto"
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col">s.no</th>
            <th scope="col">Event Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {showData &&
            showData.map((item : any, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item?.name}</td>
                  <td>
                    <Button
                      variant="secondary"
                      style={{ borderRadius: "8px", border: "none" }}
                      onClick={() => {
                        handleShow(item?.id );
                      }}
                    >
                      Edit Event
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(item?.id);
                      }}
                      style={{ borderRadius: "8px", border: "none" }}
                    >
                      Delete Event
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <hr />
      <Button
        variant="primary"
        onClick={() => {
          navigate(`/plugins/${pluginId}/addevent`);
        }}
        style={{ width: "fit-content" }}
      >
        Add Event
      </Button>
      <EditModal
        show={show}
        handleClose={handleClose}
        eventId={eventId}
        getData={getData}
      />
    </div>
  );
}

export default HomePage;
