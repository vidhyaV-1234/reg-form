document.addEventListener("DOMContentLoaded", function() {
    // Initialize event listeners
    initializeEventListeners();
});

function initializeEventListeners() {
    // Fields in Step 1
    var step1Fields = [
        "name", "gender", "age", "dob", "country", "state", 
        "email", "phone", "village", "district"
    ];

    step1Fields.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", function() {
                validateField(this);
            });
        }
    });

    // Fields in Step 2
    var step2Fields = [
        "registrationNo", "collegeName", "collegeEmail", "cgpa", 
        "currentYear", "schoolName", "tenthMark", "twelfthMark", 
        "graduationYear", "internshipReason", "resume"
    ];

    step2Fields.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", function() {
                validateField(this);
            });
        }
    });

    // Special case for file input
    var resumeInput = document.getElementById("resume");
    if (resumeInput) {
        resumeInput.addEventListener("change", function() {
            validateFileInput(this);
        });
    }

    // Form submission handler
    document.getElementById("registration-form").addEventListener("submit", function(event) {
        if (validateStep1() && validateStep2()) {
            // Allow form submission
            return true;
        } else {
            // Prevent form submission
            event.preventDefault();
            return false;
        }
    });
}

function validateField(element) {
    if (element.id === "email" || element.id === "collegeEmail") {
        validateEmail(element);
    } else if (element.id === "phone") {
        validatePhone(element);
    } else if (element.id === "cgpa") {
        validateCGPA(element);
    } else {
        // General required field validation
        if (!element.checkValidity()) {
            element.reportValidity();
        } else {
            element.setCustomValidity("");
        }
    }
}

function validateEmail(element) {
    var email = element.value;
    if (email.includes('@') && email.includes('.')) {
        element.setCustomValidity("");
    } else {
        element.setCustomValidity("Invalid email format");
    }
    element.reportValidity();
}

function validatePhone(element) {
    var phone = element.value;
    if (phone.length === 10 && /^\d+$/.test(phone)) {
        element.setCustomValidity("");
    } else {
        element.setCustomValidity("Phone number must be 10 digits");
    }
    element.reportValidity();
}

function validateCGPA(element) {
    var cgpa = element.value;
    var cgpaRegex = /^[0-9]\.[0-9]{2}$/; // One digit before and two digits after the decimal
    if (cgpaRegex.test(cgpa)) {
        element.setCustomValidity("");
    } else {
        element.setCustomValidity("CGPA must be in the format X.XX");
    }
    element.reportValidity();
}

function validateFileInput(element) {
    if (element.files.length === 0) {
        element.setCustomValidity("Please upload your resume.");
    } else {
        element.setCustomValidity("");
    }
    element.reportValidity();
}

function validateStep1() {
    var isValid = true;
    
    // Check required fields in Step 1
    var fields = [
        "name", "gender", "age", "dob", "country", "state", 
        "email", "phone", "village", "district"
    ];

    fields.forEach(function(id) {
        var element = document.getElementById(id);
        if (element && !element.checkValidity()) {
            element.reportValidity();
            isValid = false;
        }
    });

    return isValid;
}
function nextStep() {
    if (validateStep1()) {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
    }
}

function previousStep() {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step1").style.display = "block";
}


function validateStep2() {
    var isValid = true;

    // Check required fields in Step 2
    var fields = [
        "registrationNo", "collegeName", "collegeEmail", "cgpa", 
        "currentYear", "schoolName", "tenthMark", "twelfthMark", 
        "graduationYear", "internshipReason", "resume"
    ];

    fields.forEach(function(id) {
        var element = document.getElementById(id);
        if (element) {
            if (id === "resume") {
                // Special case for file input
                if (element.files.length === 0) {
                    element.setCustomValidity("Please upload your resume.");
                    isValid = false;
                }
            } else if (!element.checkValidity()) {
                element.reportValidity();
                isValid = false;
            }
        }
    });

    return isValid;
}
