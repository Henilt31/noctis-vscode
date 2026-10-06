-- Noctis Theme - SQL Query Demo
-- Aggregations, window functions, CTEs, and joins

WITH DeveloperProductivity AS (
  SELECT
    developer_id,
    session_id,
    duration_minutes,
    focus_score,
    ROW_NUMBER() OVER (
      PARTITION BY developer_id
      ORDER BY created_at DESC
    ) AS session_rank
  FROM developer_sessions
  WHERE status = 'COMPLETED'
    AND created_at >= NOW() - INTERVAL '30 days'
)
SELECT
  d.developer_id,
  d.handle,
  d.team_name,
  COUNT(dp.session_id) AS total_focus_blocks,
  ROUND(AVG(dp.duration_minutes), 2) AS avg_duration_mins,
  ROUND(AVG(dp.focus_score)::numeric, 3) AS avg_focus_score
FROM developers d
INNER JOIN DeveloperProductivity dp
  ON d.developer_id = dp.developer_id
WHERE dp.session_rank <= 20
GROUP BY d.developer_id, d.handle, d.team_name
HAVING COUNT(dp.session_id) >= 5
ORDER BY avg_focus_score DESC, total_focus_blocks DESC
LIMIT 50;
