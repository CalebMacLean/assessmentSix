const fs = require('fs').promises;
const axios = require('axios');
const url = require('url');

const filename = process.argv[2];

fs.readFile(filename, 'utf-8')
    .then(data => {
        // create an arr of urls (should be on seperate lines)
        const lines = data.split(/\r?\n/);
        // Promise.all() will tell us when all async operations have completed for a line in the file.
        return Promise.all(lines.map(async (line) => {
            // remove whitespace from line
            line = line.trim();
            // return if there is no line
            if (!line) return;

            // declare domain var before url.parse otherwise the module gets confused.
            let domain;
            try {
                domain = url.parse(line, false).hostname.split('.').slice(-2).join('.');
            } catch (error) {
                console.error(`Invalid URL: ${line}`);
                console.error(`Error message: ${error.message}`);
                return;
            }

            try {
                // after domain has been extracted, make request to url 
                const response = await axios.get(line);

                try {
                    await fs.writeFile(domain, response.data);
                    console.log(`Saved HTML to ${domain}`);
                } catch (error) {
                    console.error(`Failed to write file ${domain}: ${error.message}`);
                }
            } catch (error) {
                console.error(`Failed to fetch ${line}: ${error.message}`);
            }
        }));
    })
    .catch(error => {
        console.error(`Failed to read file ${filename}: ${error.message}`);
    });