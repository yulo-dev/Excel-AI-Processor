// frontend/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary HTML elements
    const uploadForm = getElement('uploadForm');
    const excelFile = getElement('excelFile');
    const customFileInputButton = getElement('file-name-display'); // Custom button text display
    // customFileInputWrapper is the parent div, not directly used for events here, but good to have a ref if needed.
    // const customFileInputWrapper = getElement('custom-file-input-wrapper');
    const sheetNameInput = getElement('sheetName');
    const aiCommand = getElement('aiCommand');
    const outputModeSelect = getElement('outputMode'); // Output mode selection
    const newColumnNameInput = getElement('newColumnName'); // New column name input field
    const loadingDiv = getElement('loading');
    const errorMessageDiv = getElement('error-message');
    const successMessageDiv = getElement('success-message');
    const columnNamesContainer = getElement('column-names-container');
    const columnNamesDiv = getElement('column-names');
    const dataPreviewTableContainer = getElement('data-preview-table-container');
    const aiResponsePre = getElement('ai-response');
    const resultDiv = getElement('result');
    const downloadContainer = getElement('download-container');
    const downloadLink = getElement('download-link');
    const themeToggle = getElement('theme-toggle'); // Theme toggle button
    // Ensure icons are retrieved only if themeToggle exists
    const sunIcon = themeToggle ? themeToggle.querySelector('.fa-sun') : null;
    const moonIcon = themeToggle ? themeToggle.querySelector('.fa-moon') : null;


    // URL for the backend API
    const API_URL = 'http://127.0.0.1:5000/upload';

    // Helper function to get elements and check for null
    function getElement(id) {
        const element = document.getElementById(id);
        // Do not throw an error immediately, allow the main logic to check for null later
        // This makes the script more resilient if an element is missing but not critical for initial load
        if (!element) {
            console.warn(`Warning: HTML element with ID "${id}" not found. This might cause issues.`);
        }
        return element;
    }

    // Helper function to display messages
    function showMessage(type, message) {
        if (errorMessageDiv) {
            errorMessageDiv.classList.add('hidden');
        }
        if (successMessageDiv) {
            successMessageDiv.classList.add('hidden');
        }
        if (type === 'error' && errorMessageDiv) {
            errorMessageDiv.textContent = message;
            errorMessageDiv.classList.remove('hidden');
        } else if (type === 'success' && successMessageDiv) {
            successMessageDiv.textContent = message;
            successMessageDiv.classList.remove('hidden');
        }
    }

    // Clear messages and results
    function clearMessages() {
        if (dataPreviewTableContainer) {
            dataPreviewTableContainer.innerHTML = '';
        }
        if (aiResponsePre) {
            aiResponsePre.textContent = '';
        }
        if (resultDiv) {
            resultDiv.classList.add('hidden');
        }
        if (columnNamesContainer) {
            columnNamesContainer.classList.add('hidden');
        }
        if (columnNamesDiv) {
            columnNamesDiv.textContent = '';
        }
        if (errorMessageDiv) {
            errorMessageDiv.classList.add('hidden');
        }
        if (successMessageDiv) {
            successMessageDiv.classList.add('hidden');
        }
        if (downloadContainer) {
            downloadContainer.classList.add('hidden');
            downloadLink.href = '#'; // Reset download link
        }
    }

    // Function to convert JSON data to an HTML table
    function convertJsonToHtmlTable(jsonData) {
        if (!jsonData || jsonData.length === 0) {
            return '<p>No data to display.</p>';
        }

        const headers = Object.keys(jsonData[0]);
        let tableHtml = '<table class="data-table">';

        // Table header
        tableHtml += '<thead><tr>';
        headers.forEach(header => {
            tableHtml += `<th>${header}</th>`;
        });
        tableHtml += '</tr></thead>';

        // Table body
        tableHtml += '<tbody>';
        jsonData.forEach(row => {
            tableHtml += '<tr>';
            headers.forEach(header => {
                let cellValue = row[header];
                // Display null, undefined, NaN as empty string or '-'
                if (cellValue === null || cellValue === undefined || (typeof cellValue === 'number' && isNaN(cellValue))) {
                    cellValue = '-';
                }
                tableHtml += `<td>${cellValue}</td>`;
            });
            tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table>';

        return tableHtml;
    }

    // Listen for changes in output mode selection
    if (outputModeSelect && newColumnNameInput) {
        outputModeSelect.addEventListener('change', () => {
            if (outputModeSelect.value === 'new_column_original_sheet') {
                newColumnNameInput.classList.remove('hidden');
                newColumnNameInput.focus(); // Auto-focus
            } else {
                newColumnNameInput.classList.add('hidden');
                newColumnNameInput.value = ''; // Clear column name
            }
        });
        // Initialize check once, in case the option is 'new_column_original_sheet' on page load
        outputModeSelect.dispatchEvent(new Event('change'));
    }

    // Handle custom file input display
    if (excelFile && customFileInputButton) {
        excelFile.addEventListener('change', () => {
            if (excelFile.files.length > 0) {
                customFileInputButton.textContent = excelFile.files[0].name;
            } else {
                customFileInputButton.textContent = 'No file chosen';
            }
        });
    }

    // --- Theme Toggle Logic ---
    function applyTheme(theme) {
        if (document.body) {
            if (theme === 'dark') {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                if (sunIcon) sunIcon.classList.remove('hidden');
                if (moonIcon) moonIcon.classList.add('hidden');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                if (sunIcon) sunIcon.classList.add('hidden');
                if (moonIcon) moonIcon.classList.remove('hidden');
            }
        }
    }

    // Load saved theme from localStorage or default to dark mode
    // Ensure document.body exists before applying theme
    if (document.body) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);
    } else {
        console.warn("Document body not available on DOMContentLoaded for theme application.");
    }


    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    // --- End Theme Toggle Logic ---


    // Ensure all critical elements are available before binding main form event
    const criticalElements = [
        uploadForm, excelFile, aiCommand, outputModeSelect, newColumnNameInput,
        loadingDiv, errorMessageDiv, successMessageDiv, columnNamesContainer,
        columnNamesDiv, dataPreviewTableContainer, aiResponsePre, resultDiv,
        downloadContainer, downloadLink, customFileInputButton, themeToggle
    ];

    const allCriticalElementsExist = criticalElements.every(element => element !== null);

    if (allCriticalElementsExist) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            clearMessages();

            loadingDiv.classList.remove('hidden');

            const file = excelFile.files[0];
            const sheetName = sheetNameInput.value.trim();
            const command = aiCommand.value.trim();
            const outputMode = outputModeSelect.value; // Get selected output mode
            const newColumnName = newColumnNameInput.value.trim(); // Get new column name

            console.log(`DEBUG: Frontend received command: '${command}', Output Mode: ${outputMode}, New Column Name: '${newColumnName}'`);

            // Validate new column name
            if (outputMode === 'new_column_original_sheet' && !newColumnName) {
                showMessage('error', 'Please specify a name for the new column!');
                loadingDiv.classList.add('hidden');
                return;
            }
            if (!file) {
                showMessage('error', 'Please select an Excel file!');
                loadingDiv.classList.add('hidden');
                return;
            }

            if (!command) {
                showMessage('error', 'Please enter an AI command!');
                loadingDiv.classList.add('hidden');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('command', command);
            formData.append('output_mode', outputMode); // Pass output mode to backend
            if (newColumnName) {
                formData.append('new_column_name', newColumnName); // Pass new column name
            }
            if (sheetName) {
                formData.append('sheet_name', sheetName);
            }

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    body: formData,
                });

                const responseText = await response.text();
                console.log("DEBUG: Raw response text:", responseText);

                let data;
                try {
                    // Try to find the start of a JSON object or array to handle potential extra logging from Flask
                    const jsonStartIndex = responseText.indexOf('{');
                    const arrayStartIndex = responseText.indexOf('[');

                    let actualJsonString = responseText;
                    if (jsonStartIndex !== -1 && (arrayStartIndex === -1 || jsonStartIndex < arrayStartIndex)) {
                        actualJsonString = responseText.substring(jsonStartIndex);
                    } else if (arrayStartIndex !== -1) {
                        actualJsonString = responseText.substring(arrayStartIndex);
                    } else {
                        // If no JSON start character is found, the response might not be JSON, or it's malformed.
                        // In this case, throw an error to be caught by the outer catch block.
                        throw new Error("Could not find a valid JSON start character '{' or '[' in the response.");
                    }

                    data = JSON.parse(actualJsonString);
                    console.log("DEBUG: Successfully parsed JSON data:", data);

                } catch (jsonParseError) {
                    console.error("JSON parsing failed, raw response text might be incorrect:", jsonParseError);
                    showMessage('error', `Failed to parse server response: ${jsonParseError.message}. Raw response might be incorrect.`);
                    loadingDiv.classList.add('hidden');
                    return;
                }


                if (response.ok) {
                    showMessage('success', data.message);

                    // Display data preview table
                    if (data.data_preview && Array.isArray(data.data_preview)) {
                        dataPreviewTableContainer.innerHTML = convertJsonToHtmlTable(data.data_preview);

                        // Display detected column names
                        if (data.data_preview.length > 0) {
                            const columnNames = Object.keys(data.data_preview[0]);
                            columnNamesDiv.textContent = columnNames.join(', ');
                            columnNamesContainer.classList.remove('hidden');
                        } else {
                            columnNamesDiv.textContent = 'No column names detected (data preview is empty).';
                            columnNamesContainer.classList.remove('hidden');
                        }

                    } else {
                        dataPreviewTableContainer.innerHTML = '<p>No data preview available.</p>';
                        columnNamesDiv.textContent = 'No data preview, unable to detect column names.';
                        columnNamesContainer.classList.remove('hidden');
                    }

                    aiResponsePre.textContent = data.ai_response || "No AI response.";

                    resultDiv.classList.remove('hidden');

                    // Display download button
                    if (data.download_url) {
                        downloadLink.href = data.download_url;
                        downloadContainer.classList.remove('hidden');
                        // Ensure the download works by programmatically clicking an anchor tag
                        downloadLink.onclick = function(event) {
                            event.preventDefault(); // Prevent default link behavior
                            const tempLink = document.createElement('a');
                            tempLink.href = data.download_url;
                            tempLink.download = data.filename || 'processed_excel_results.xlsx'; // Fallback filename
                            document.body.appendChild(tempLink);
                            tempLink.click();
                            document.body.removeChild(tempLink);
                        };
                    } else {
                        downloadContainer.classList.add('hidden');
                    }

                } else {
                    showMessage('error', data.error || 'Upload failed, please try again later.');
                }
            } catch (error) {
                console.error('An error occurred during upload:', error);
                showMessage('error', 'Network error or server not responding. Please check if the backend is running.');
            } finally {
                loadingDiv.classList.add('hidden');
            }
        });
    } else {
        console.error("Error: Application failed to start because some critical HTML elements were not found. Please ensure all IDs in index.html are correct and the file is fully loaded.");
        showMessage('error', 'Application failed to start: Missing required HTML elements.');
    }
});
