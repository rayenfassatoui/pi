import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Timer, Play, Pause, RotateCcw, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const CookingTimer = () => {
    const [timers, setTimers] = useState([]);
    const [newTimerMinutes, setNewTimerMinutes] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(prevTimers => prevTimers.map(timer => {
                if (timer.isRunning && timer.timeLeft > 0) {
                    return { ...timer, timeLeft: timer.timeLeft - 1 };
                } else if (timer.isRunning && timer.timeLeft === 0) {
                    new Notification("Timer Done!", { body: "Your timer has finished." });
                    return { ...timer, isRunning: false };
                }
                return timer;
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    const addTimer = () => {
        const minutes = parseInt(newTimerMinutes);
        if (!minutes) return;

        setTimers([...timers, {
            id: Date.now(),
            timeLeft: minutes * 60,
            originalTime: minutes * 60,
            isRunning: true
        }]);
        setNewTimerMinutes('');
    };

    const toggleTimer = (id) => {
        setTimers(timers.map(t => t.id === id ? { ...t, isRunning: !t.isRunning } : t));
    };

    const resetTimer = (id) => {
        setTimers(timers.map(t => t.id === id ? { ...t, timeLeft: t.originalTime, isRunning: false } : t));
    };

    const removeTimer = (id) => {
        setTimers(timers.filter(t => t.id !== id));
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {timers.map(timer => (
                <Card key={timer.id} className="w-64 shadow-xl">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="text-2xl font-mono font-bold">
                            {formatTime(timer.timeLeft)}
                        </div>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => toggleTimer(timer.id)}>
                                {timer.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => resetTimer(timer.id)}>
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeTimer(timer.id)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            
            <div className="bg-background border rounded-lg p-2 shadow-lg flex gap-2">
                <Input
                    type="number"
                    placeholder="Min"
                    className="w-20"
                    value={newTimerMinutes}
                    onChange={(e) => setNewTimerMinutes(e.target.value)}
                />
                <Button size="icon" onClick={addTimer}>
                    <Timer className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default CookingTimer;
