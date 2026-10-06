"""
Noctis Theme - Python Demo
Demonstrates classes, dataclasses, decorators, type hints, and docstrings.
"""

from __future__ import annotations
import time
import functools
from dataclasses import dataclass, field
from typing import Callable, Any, TypeVar, Optional, List

F = TypeVar("F", bound=Callable[..., Any])


def measure_latency(func: F) -> F:
    """Decorator to measure and log execution time of a routine."""
    @functools.wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start_time = time.perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            elapsed = (time.perf_counter() - start_time) * 1000.0
            print(f"[Noctis Profiler] {func.__name__} completed in {elapsed:.2f}ms")
    return wrapper  # type: ignore


@dataclass
class FocusSession:
    """Represents an active developer deep-work session."""
    session_id: str
    duration_minutes: int
    tags: List[str] = field(default_factory=list)
    is_active: bool = True
    interruption_count: int = 0

    def record_interruption(self, reason: Optional[str] = None) -> None:
        """Increment interruption count and log note."""
        self.interruption_count += 1
        if reason:
            print(f"Interruption recorded: {reason}")

    @property
    def efficiency_score(self) -> float:
        if self.duration_minutes <= 0:
            return 0.0
        penalty = self.interruption_count * 0.15
        return max(0.0, round(1.0 - penalty, 2))

    def __repr__(self) -> str:
        return f"<FocusSession id={self.session_id!r} score={self.efficiency_score}>"


@measure_latency
def start_deep_work(project_name: str, target_minutes: int = 90) -> FocusSession:
    """Initialize a new deep-work focus block."""
    if target_minutes < 15:
        raise ValueError("Deep work sessions must be at least 15 minutes long.")

    session = FocusSession(
        session_id=f"noctis-{int(time.time())}",
        duration_minutes=target_minutes,
        tags=["core-architecture", "refactoring", project_name],
    )
    return session


if __name__ == "__main__":
    session = start_deep_work("theme-engine", target_minutes=120)
    print(f"Session initialized: {session}")
