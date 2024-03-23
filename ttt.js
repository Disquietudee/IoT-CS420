// The refId (query name) only updates after a page refresh.
const [{ query, refId, datasource }] = data.request.targets;
const { from, to } = data.timeRange;
const datasourceData = Object.values(grafanaBootData.settings.datasources).find((d) => d.uid === datasource.uid);
const datasourceUrl = datasourceData.url;
const db = datasourceData.jsonData.dbName;
// Telegram bot 
const botToken = '6947537149:AAHi7yT8z5NqkxtNytA_0Inc8knzCJ1hIrE';
const chatId = '809069555'; 

const btn = htmlNode.querySelector('button');
const timeoutLength = 3000;

// Convert to time zone (UTC+8)
var options = {
    timeZone: 'Asia/Singapore',
    month: '2-digit', // MM
    day: '2-digit', // dd
    year: 'numeric', // yyyy
    hour: '2-digit', // hh
    minute: '2-digit', // mm
    second: '2-digit', // ss
    hour12: true // tt (AM/PM)
};
var fromDate = new Date(from).toLocaleString('en-US', options).replace(',', '').replace(/ /g, '_');
var toDate = new Date(to).toLocaleString('en-US', options).replace(',', '').replace(/ /g, '_');

const defaultButtonText = "Generate Report";
btn.innerHTML = defaultButtonText;

const toCsv = (resultsData) => {
  const [
    {
      series: [{ columns, values }],
    },
  ] = Object.values(resultsData.results);

  const csv = [
    columns.join(','),
    ...values.map((v) => {
      const [timeField, ...rest] = v;
      const time = new Date(timeField).toISOString();
      return [time, ...rest].join(',');
    }),
  ].join('\r\n');

  return csv;
};

const generateReport = async (csv, filename) => {
  const formData = new FormData();
  formData.append('file', new Blob([csv], { type: 'text/csv' }), filename + '.csv');

  try {
    const url = 'http://'+window.location.hostname+':5000/generate_report';
    console.log(url);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload CSV file to the API.');
    }

    const pdfBlob = await response.blob();

    await sendTelegramDocument(pdfBlob, "Report("+filename+").pdf");

  } catch (error) {
    console.error('Error:', error.message);
  }
};

const sendTelegramMessage = async (message) => {
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });
  
    } catch (error) {
      console.error('Error sending message to Telegram:', error.message);
    }
  };  

const sendTelegramDocument = async (pdfBlob, filename) => {
  try {
    console.log("--------------------------------")
    console.log(pdfBlob)
    console.log(filename)

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', pdfBlob, filename);

    await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Error sending report to Telegram:', error.message);
  }
};

// On Click
btn.onclick = async () => {
  clearTimeout(btn.timeout);
  btn.innerHTML = 'Generating...';

  // Handle no data is found
  if (!data.series || data.series.length === 0) {
    btn.innerHTML = 'No data available to generate a report';
    btn.timeout = setTimeout(() => {
      btn.innerHTML = defaultButtonText;
    }, timeoutLength);
    return;
  }

  sendTelegramMessage(`Generating report \n\nFrom: ${fromDate.replace('_', ', ').replace('_', '')} \nTo: ${toDate.replace('_', ', ').replace('_', '')}\n\nPlease wait...`);

  function unixTimestampToISO8601(timestamp,check) {
    var date = new Date(timestamp);
    if(check === true){
      date.setMinutes(date.getMinutes() + 1);
    }
    return date.toISOString().slice(0, 19) + 'Z';
  }

  const length = data.series[0].fields[0].values.length
  const startTime = unixTimestampToISO8601(data.series[0].fields[0].values[0],false);
  const endTime = unixTimestampToISO8601(data.series[0].fields[0].values[length-1],true);
  const replacedQuery = `time >= '${startTime}' AND time <= '${endTime}'`;
  // const replacedQuery = "time >= '2024-03-20T00:00:00Z' AND time <= '2024-03-20T23:59:59Z'"

  const q = getTemplateSrv().replace(query).replace('$timeFilter', replacedQuery);
  console.log(q)
  const filename = [fromDate, toDate].join('-') + '';

  const params = new URLSearchParams({
    db: db,
    q: q,
    epoch: 'ms',
  });

  console.log(datasourceUrl + '/query?' + params.toString())
  fetch(datasourceUrl + '/query?' + params.toString(), {
    headers: {
      'cache-control': 'no-cache',
    },
  })
    .then((res) => res.json())
    .then((data) => {

      console.log(data);
      
      const csv = toCsv(data);
      if (csv) {
        generateReport(toCsv(data), filename);
        btn.innerHTML = 'Report is generating <br>(Sending to Telegram Chat)';
      }

      btn.timeout = setTimeout(() => {
        btn.innerHTML = defaultButtonText;
      }, timeoutLength);
    })
    .catch((e) => {
      btn.innerHTML = 'Export failed... (Failed retrieving data)';
      console.warn(e);

      btn.timeout = setTimeout(() => {
        btn.innerHTML = defaultButtonText;
      }, timeoutLength);
    });
};

