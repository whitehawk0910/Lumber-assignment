import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [wbs, setWBS] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [openWbsItems, setOpenWbsItems] = useState([]);

  useEffect(() => {
    fetch('/project.json')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching project.json:', error));

    fetch('/wbs.json')
      .then(response => response.json())
      .then(data => setWBS(data))
      .catch(error => console.error('Error fetching wbs.json:', error));

    fetch('/task.json')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching task.json:', error));
  }, []);

  const toggleProject = projectId => {
    setOpenProjects(openProjects.includes(projectId)
      ? openProjects.filter(id => id !== projectId)
      : [...openProjects, projectId]
    );
  };

  const toggleWbsItem = wbsId => {
    setOpenWbsItems(openWbsItems.includes(wbsId)
      ? openWbsItems.filter(id => id !== wbsId)
      : [...openWbsItems, wbsId]
    );
  };

  return (
    <div className="app-container">
      <ul className="projects-list">
        {projects.map(project => (
          <li key={project.id}>
            <button
              className={`project-button ${openProjects.includes(project.id) ? 'active' : ''}`}
              onClick={() => toggleProject(project.id)}
            >
              {project.name}
            </button>
            {openProjects.includes(project.id) && (
              <ul className="wbs-list">
                {wbs
                  .filter(w => w.projectId === project.id)
                  .map(wbsItem => (
                    <li key={wbsItem.id}>
                      <button
                        className={`wbs-button ${openWbsItems.includes(wbsItem.id) ? 'active' : ''}`}
                        onClick={() => toggleWbsItem(wbsItem.id)}
                      >
                        {wbsItem.name}
                      </button>
                      {openWbsItems.includes(wbsItem.id) && (
                        <ul className="task-list">
                          {tasks
                            .filter(t => t.wbsId === wbsItem.id)
                            .map(task => (
                              <li key={task.id}>{task.name}</li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
