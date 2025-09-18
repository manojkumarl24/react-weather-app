export default function ForecastedData({ data }: any){
    if (!data) return <p>No forecast data available.</p>;

    return <>
        <div>
            <h2>7-Day Forecast</h2>
            <table border={1} cellPadding={8} style={{ borderCollapse: "collapse" }}>
                <tbody>
                <tr>
                    <td><strong>Date</strong></td>
                    {data.daily.time.map((date: string, i: number) => (
                        <td key={i}>{date}</td>
                    ))}
                </tr>

                <tr>
                    <td><strong>Max Temp (°C)</strong></td>
                    {data.daily.temperature_2m_max.map((temp: number, i: number) => (
                        <td key={i}>{temp}</td>
                    ))}
                </tr>

                <tr>
                    <td><strong>Min Temp (°C)</strong></td>
                    {data.daily.temperature_2m_min.map((temp: number, i: number) => (
                        <td key={i}>{temp}</td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    </>
}
