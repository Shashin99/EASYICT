import React, { useState } from "react";
import students from "../data/student";
import "./HomeScreen.css";
import ictImage from "../assets/ICT.jpeg";

const getGrade = (marks) => {
    if (marks >= 75) return "A";
    if (marks >= 65) return "B";
    if (marks >= 55) return "C";
    if (marks >= 40) return "S";
    return "W";
};

const getGradeStyles = (grade) => {
    switch (grade) {
        case "A":
            return { bg: "#28a745", color: "white" }; // green
        case "B":
            return { bg: "#007bff", color: "white" }; // blue
        case "C":
            return { bg: "#ffc107", color: "black" }; // yellow
        case "S":
            return { bg: "#fd7e14", color: "white" }; // orange
        case "W":
            return { bg: "#dc3545", color: "white" }; // red
        default:
            return { bg: "#f8f9fa", color: "black" };
    }
};

export default function HomeScreen() {
    const [studentId, setStudentId] = useState("");
    const [student, setStudent] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        const found = students.find(
            (s) => s.id.toLowerCase() === studentId.toLowerCase()
        );
        setStudent(found || null);
        setSearched(true);
    };

    return (
        <div className="container">
            <h1 className="title">📘 Student Marks Viewer - 2025 A/L</h1>
            <p className="subtitle">#EASY ICT</p>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter Student ID"
                    value={studentId}
                    onChange={(e) => {
                        setStudentId(e.target.value);
                        setSearched(false); // Reset search state when typing
                    }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Always show ICT image until search is clicked */}
            {(!searched || !student) && (
                <div className="card image-card">
                    <img src={ictImage} alt="ICT" className="ict-image" />
                </div>
            )}

            {searched && student && (
                <div
                    className="card"
                    style={{
                        borderTop: `6px solid ${
                            getGradeStyles(getGrade(student.total)).bg
                        }`,
                    }}
                >
                    <h2>Hi {student.name} 👋</h2>
                    <p className="total">
                        <strong>Total Marks:</strong> {student.total}
                    </p>
                    <p className="grade">
                        Final Grade:{" "}
                        <span
                            className="grade-badge"
                            style={{
                                backgroundColor: getGradeStyles(
                                    getGrade(student.total)
                                ).bg,
                                color: getGradeStyles(getGrade(student.total))
                                    .color,
                            }}
                        >
                            {getGrade(student.total)}
                        </span>
                    </p>
                    <div className="marks">
                        <div className="mark-item">
                            <span>📝 MCQ</span>
                            <b>{student.mcq}</b>
                        </div>
                        <div className="mark-item">
                            <span>📖 Structured</span>
                            <b>{student.structured}</b>
                        </div>
                        <div className="mark-item">
                            <span>✍️ Essay</span>
                            <b>{student.essay}</b>
                        </div>
                    </div>
                </div>
            )}

            {searched && !student && (
                <p className="error">❌ No student found</p>
            )}
        </div>
    );
}
