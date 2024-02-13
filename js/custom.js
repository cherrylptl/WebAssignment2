function formSubmit() {
    var myOutput = '';
    var errors = '';

    // get input data from the form
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var postcode = document.getElementById('postcode').value;
    var province = document.getElementById('province').value;
    var creditcard = document.getElementById('creditcard').value;
    var expirydate = document.getElementById('expirydate').value;
    var year = document.getElementById('year').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var product1 = document.getElementById('product1').value;
    var product2 = document.getElementById('product2').value;
    var product3 = document.getElementById('product3').value;
    var product4 = document.getElementById('product4').value;

    // Name 
    if (name.trim() === '') {
        errors += 'Name is required.<br>';
    }

    // Email 
    if (email.trim() === '') {
        errors += 'Email is required.<br>';
    } else {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors += 'Email is not valid.<br>';
        }
    }

    // Phone 
    if (phone.trim() === '') {
        errors += 'Phone is required.<br>';
    } else {
        var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            errors += 'Phone is not valid. Please enter in the format xxx-xxx-xxxx.<br>';
        }
    }

    // Address
    if (address.trim() === '') {
        errors += 'Address is required.<br>';
    }

    // City 
    if (city.trim() === '') {
        errors += 'City is required.<br>';
    }

    // Postcode
    var postcodeRegex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
    if (postcode.trim() === '') {
        errors += 'Postcode is required.<br>';
    } else if (!postcodeRegex.test(postcode)) {
        errors += 'Postcode is not in correct format. Please enter in the format X0X 0X0.<br>';
    }

    // Province 
    if (province === '') {
        errors += 'Please select a province.<br>';
    }

    // Credit Card 
    if (creditcard.trim() === '') {
        errors += 'Credit Card number is required.<br>';
    } else {
        var creditcardRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!creditcardRegex.test(creditcard)) {
            errors += 'Credit Card is not valid. Please enter in the format xxxx-xxxx-xxxx-xxxx.<br>';
        }
    }

    // Expiry Date 
    // if (expirydate.trim() === '' || year.trim() === '') {
    //     errors += 'Expiry Date is required.<br>';
    // }

    // Credit Card Expiry Month 
    var monthRegex = /^[A-Za-z]{3}$/;
    if (expirydate.trim() === '') {
        errors += 'Credit Card Expiry Month is required.<br>';
    } else if (!monthRegex.test(expirydate)) {
        errors += 'Expiry Month is not valid. Please enter in the format MMM (ex-NOV).<br>';
    }

    // Credit Card Expiry Year
    var yearRegex = /^\d{4}$/;
    if (year.trim() === '') {
        errors += 'Credit Card Expiry Year is required.<br>';
    } else if (!yearRegex.test(year)) {
        errors += 'Credit Card Expiry Year is not valid. Please enter in the format YYYY (ex-2021).<br>';
    }

    // Password 
    if (password.trim() === '') {
        errors += 'Password is required.<br>';
    }

    // Confirm Password 
    if (confirmPassword.trim() === '') {
        errors += 'Confirm Password is required.<br>';
    } else if (password !== confirmPassword) {
        errors += 'Passwords do not match.<br>';
    }

    // Product 
    if (product1 === '0' && product2 === '0' && product3 === '0' && product4 === '0') {
        errors += 'Minimum Purchase should be $10.<br>';
    }

    // Calculate tax
    var taxRate = getTaxRate(province);
    if (taxRate === null) {
        errors += 'Tax rate for the selected province is not available.<br>';
    }

    // generate receipt
    if (errors.trim() === '') {
        var totalCost = (parseFloat(product1) * 100) + (parseFloat(product2) * 10) + (parseFloat(product3) * 10) + (parseFloat(product4) * 20);
        var tax = totalCost * taxRate;
        var totalAmount = totalCost + tax;

        myOutput += '<p>Name : ' + name + '</p>';
        myOutput += '<p>Email : ' + email + '</p>';
        myOutput += '<p>Phone : ' + phone + '</p>';
        myOutput += '<p>Address : ' + address + '</p>';
        myOutput += '<p>City : ' + city + '</p>';
        myOutput += '<p>Postcode : ' + postcode + '</p>';
        myOutput += '<p>Province : ' + province + '</p>';
        myOutput += '<p>Credit Card : ' + creditcard + '</p>';
        myOutput += '<p>Expiry Date : ' + expirydate + '/' + year + '</p>';
        myOutput += '<h3>List Of Products</h3>';
        if (parseInt(product1) > 0) {
            myOutput += '<li>Laptop : Quantity - ' + product1 + '</li>';
        }
        if (parseInt(product2) > 0) {
            myOutput += '<li>Keyborad : Quantity - ' + product2 + '</li>';
        }
        if (parseInt(product3) > 0) {
            myOutput += '<li>Mouse : Quantity - ' + product3 + '</li>';
        }
        if (parseInt(product4) > 0) {
            myOutput += '<li>SSD : Quantity - ' + product4 + '</li>';
        }
        myOutput += '<p>Total Cost: $' + totalCost.toFixed(2) + '</p>';
        myOutput += '<p>Tax: $' + tax.toFixed(2) + '</p>';
        myOutput += '<p>Total Amount: $' + totalAmount.toFixed(2) + '</p>';


        // Display receipt
        document.getElementById('formResult').innerHTML = myOutput;

        // Clear all fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('postcode').value = '';
        document.getElementById('province').selectedIndex = 0;
        document.getElementById('creditcard').value = '';
        document.getElementById('expirydate').value = '';
        document.getElementById('year').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('product1').value = '0';
        document.getElementById('product2').value = '0';
        document.getElementById('product3').value = '0';
        document.getElementById('product4').value = '0';

        // Clear error messages
        document.getElementById('errors').innerHTML = '';

        return false;
    } else {
        // Display error
        document.getElementById('errors').innerHTML = errors;
        return false;
    }




}

function getTaxRate(province) {
    switch (province) {
        case 'AB':
            return 0.05;
        case 'BC':
            return 0.12;
        case 'MB':
            return 0.12;
        case 'NB':
            return 0.15;
        case 'BFL':
            return 0.15;
        case 'NT':
            return 0.05;
        case 'NS':
            return 0.15;
        case 'NU':
            return 0.05;
        case 'ON':
            return 0.13;
        case 'PEI':
            return 0.15;
        case 'QU':
            return 0.14;
        case 'SA':
            return 0.11;
        case 'YU':
            return 0.05;

        default:
            return 0.0;
    }
}
