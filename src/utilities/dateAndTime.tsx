const now = new Date();

const date = now.toLocaleDateString('en-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

const time = now.toLocaleTimeString('en-DE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'long',
});

const formattedDateTime = `${date}, ${time}`;

export default formattedDateTime;
