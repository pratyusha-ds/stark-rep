package com.gymtracker.backend.sessions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class WorkoutSessionService {

    @Autowired
    private WorkoutSessionRepository sessionRepository;

    public List<WorkoutSession> getAllSessions() {
        return sessionRepository.findAll();
    }

    @Transactional
    public WorkoutSession createSession() {
        WorkoutSession session = new WorkoutSession();
        return sessionRepository.save(session);
    }
}